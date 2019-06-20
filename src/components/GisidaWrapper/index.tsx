import GeojsonExtent from '@mapbox/geojson-extent';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { Feature } from 'geojson';
import { Actions, ducks, loadLayers } from 'gisida';
import { Map } from 'gisida-react';
import { FillPaint, LinePaint, Style, SymbolPaint } from 'mapbox-gl';
import * as React from 'react';
import Loading from '../../components/page/Loading/index';
import { GISIDA_MAPBOX_TOKEN, GISIDA_ONADATA_API_TOKEN } from '../../configs/env';
import { circleLayerConfig, fillLayerConfig, lineLayerConfig } from '../../configs/settings';
import {
  APP,
  FEATURE,
  FEATURE_COLLECTION,
  MAIN_PLAN,
  MAP_ID,
  MULTI_POLYGON,
  NO_GEOMETRIES_RESPONSE,
  POINT,
  POLYGON,
  STRINGIFIED_GEOJSON,
} from '../../constants';
import { EventData } from '../../helpers/mapbox';
import { ConfigStore,FeatureCollection, FlexObject } from '../../helpers/utils';
import store from '../../store';
import { Goal } from '../../store/ducks/goals';
import { Jurisdiction, JurisdictionGeoJSON } from '../../store/ducks/jurisdictions';
import { Task, TaskGeoJSON } from '../../store/ducks/tasks';
import './gisida.css';

/** handlers Interface */
export interface Handlers {
  name: string;
  type: string;
  method: (e: EventData) => void;
}

/** LineLayerObj Interface  */
interface LineLayerObj {
  id: string;
  paint: LinePaint;
  source: {
    data: {
      data: string;
      type: string;
    };
    type: string;
  };
  type: 'line';
  visible: boolean;
}
/** PointLayerObj Interface  */
interface PointLayerObj {
  id: string;
  layout: {
    'icon-image': string;
    'icon-size': number;
  };
  minzoom: number;
  paint: SymbolPaint;
  source: {
    data: {
      data: string;
      type: string;
    };
    minzoom: number;
    type: string;
  };
  type: 'symbol';
  visible: boolean;
}
/** FillLayerObj Interface */
interface FillLayerObj {
  id: string;
  paint: FillPaint;
  source: {
    data: {
      data: string;
      type: string;
    };
    type: string;
  };
  type: string;
  visible: boolean;
}

const symbolLayers: PointLayerObj[] | LineLayerObj[] | FillLayerObj[] | FlexObject = [];

/** GisidaWrapper state interface */
interface GisidaState {
  bounds: number[];
  locations: JurisdictionGeoJSON | false;
  doInitMap: boolean;
  doRenderMap: boolean;
  geoData: Jurisdiction | false;
  hasGeometries: boolean | false;
  // tasks: Task[] | null;
  initMapWithoutTasks: boolean | false;
  renderTasks: boolean | false;
  featureCollection: FeatureCollection<TaskGeoJSON>;
  initMapWithoutFC: boolean | false;
}
/** GisidaWrapper Props Interface */
interface GisidaProps {
  currentGoal?: string | null;
  featureCollection: FeatureCollection<TaskGeoJSON> | null;
  geoData: Jurisdiction | null;
  goal?: Goal[] | null;
  handlers: Handlers[];
  // tasks: Task[] | null;
  minHeight?: string;
  basemapStyle?: string | Style;
}

/** Returns a single layer configuration */
const LayerStore = (layer: FlexObject) => {
  if (typeof layer === 'string') {
    return layer;
  }
  return layer;
};

/** default props for ActiveFI Map component */
export const defaultGisidaProps: GisidaProps = {
  currentGoal: null,
  featureCollection: null,
  geoData: null,
  goal: null,
  handlers: [],
  // tasks: null,
};

/** Wrapper component for Gisida-powered maps */
class GisidaWrapper extends React.Component<GisidaProps, GisidaState> {
  public static defaultProps = defaultGisidaProps;
  constructor(props: GisidaProps) {
    super(props);
    const initialState = store.getState();
    this.state = {
      bounds: [],
      doInitMap: false,
      doRenderMap: false,
      featureCollection: this.props.featureCollection!, // why is this or false though
      geoData: this.props.geoData || false,
      hasGeometries: false,
      initMapWithoutFC: false,
      initMapWithoutTasks: false,
      locations: false,
      renderTasks: false,
      // tasks: this.props.tasks || false, // so this is replaced by feature collection
    };

    if (!initialState.APP && ducks.APP) {
      reducerRegistry.register(APP, ducks.APP.default);
    }
    if (!initialState[MAP_ID] && ducks.MAP) {
      reducerRegistry.register(MAP_ID, ducks.MAP.default);
    }
  }

  public componentWillMount() {
    // if (!this.props.tasks) { // guess we are gonna be initmapwithoutFeaturecollection
    //   this.setState({
    //     initMapWithoutTasks: true,
    //   });
    // }
    if (this.props.featureCollection && !this.props.featureCollection.features) {
      this.setState({
        initMapWithoutFC: true,
      });
    }
  }

  public componentDidMount() {
    if (!this.state.locations) {
      this.setState(
        // {
        //   doInitMap: true,
        //   initMapWithoutTasks: false, // how is locations related to tasks and why does it lead to initMapWithout Tasks being false, how does geoData come in
        // }
        {
          doInitMap: true,
          initMapWithoutFC: false, // still need to know why? here
        },
        () => {
          this.getLocations(this.props.geoData);
        }
      );
    }
  }

  public componentWillReceiveProps(nextProps: GisidaProps) {
    if (this.props.geoData !== nextProps.geoData && this.state.doRenderMap) {
      this.setState(
        {
          doRenderMap: false,
          geoData: nextProps.geoData || false,
          locations: false,
        },
        () => {
          this.getLocations(nextProps.geoData);
        }
      );
    }

    // if (
    //   (!(nextProps.tasks && nextProps.tasks.length) && !this.state.initMapWithoutTasks) ||
    //   typeof nextProps.tasks === 'undefined'
    // ) {
    //   this.setState({ doInitMap: true, initMapWithoutTasks: true }, () => {
    //     // Dirty work around! Arbitrary delay to allow style load before adding layers
    //     setTimeout(() => {
    //       this.initMap(null);
    //     }, 3000);
    //   });
    // }
    if (
      nextProps.featureCollection &&
      ((!(nextProps.featureCollection.features && nextProps.featureCollection.features.length) && // dont think using array length as boolean in js is a good idea. Research on which is better, using length or an utility like lodash's some
        !this.state.initMapWithoutFC) ||
        typeof nextProps.featureCollection.features === 'undefined')
    ) {
      this.setState({ doInitMap: true, initMapWithoutFC: true }, () => {
        // setState apparently takes a callback
        //     // Dirty work around! Arbitrary delay to allow style load before adding layers
        setTimeout(() => {
          this.initMap(null);
        }, 3000);
      });
    }
  }

  public componentWillUpdate(nextProps: FlexObject) {
    // if (
    //   // this is where the task data rerenders on change of the current Goal
    //   nextProps.tasks &&
    //   nextProps.tasks.length &&
    //   (nextProps.currentGoal !== this.props.currentGoal &&
    //     (this.state.locations || this.state.doInitMap))
    // ) {
    //   this.setState({ doInitMap: false, initMapWithoutTasks: false }, () => {
    //     this.initMap(nextProps.tasks);
    //   });
    // }
    if (
      nextProps.featureCollection &&
      nextProps.featureCollection.features &&
      nextProps.featureCollection.features.length &&
      nextProps.currentGoal !== this.props.currentGoal &&
      (this.state.locations || this.state.doInitMap)
    ) {
      this.setState({ doInitMap: false, initMapWithoutFC: false }, () => {
        this.initMap(nextProps.featureCollection.features);
      });
    }
  }

  public render() {
    const { minHeight } = this.props || '80vh';
    const currentState = store.getState();
    const mapId = MAP_ID;
    const doRenderMap = this.state.doRenderMap && typeof currentState[mapId] !== 'undefined';
    if (!doRenderMap) {
      return <Loading minHeight={minHeight} />;
    }
    return <Map mapId={mapId} store={store} handlers={this.props.handlers} />;
  }

  // Get relevant goejson locations
  private async getLocations(geoData: Jurisdiction | null) {
    // Determine map bounds from locations geoms
    let locations: JurisdictionGeoJSON | false = false;
    if (geoData && geoData.geojson && geoData.geojson.geometry) {
      locations = geoData.geojson;
    }
    if (locations) {
      const bounds = GeojsonExtent(locations);
      this.setState({ locations, doInitMap: true, bounds });
    }
  }

  // Define map site-config object to init the store
  private initMap(featureCollection: FeatureCollection<TaskGeoJSON> | null) {
    if (featureCollection && featureCollection.features) {
      // best way to use an array as implicit boolean
      const features = featureCollection.features;
      const points: TaskGeoJSON[] = [];
      // handle geometries of type polygon or multipolygon
      features.forEach((feature: TaskGeoJSON) => {
        if (
          (feature.geometry && feature.geometry.type === POLYGON) ||
          (feature && feature.geometry && feature.geometry.type === MULTI_POLYGON)
        ) {
          let fillLayer: FillLayerObj | null = null;
          fillLayer = {
            ...fillLayerConfig,
            id: `${feature.properties.goal_id}-${feature.id}`,
            paint: {
              ...fillLayerConfig.paint,
              'fill-color': ['get', 'color'],
              'fill-outline-color': ['get', 'color'],
            },
            source: {
              ...fillLayerConfig.source,
              data: {
                ...fillLayerConfig.source.data,
                data: JSON.stringify(feature),
              },
            },
          };
          symbolLayers.push(fillLayer);
        }
        if (feature.geometry && feature.geometry.type === POINT) {
          // push type point tasks to points list
          points.push(feature);
        }
      });

      if (points.length > 0) {
        // build a feature collection for points
        let featureColl = {};
        featureColl = {
          features: points.map((point: TaskGeoJSON) => {
            const propsObj = {
              ...(point && point.properties),
            };
            return {
              geometry: {
                ...point.geometry,
              },
              properties: propsObj,
              type: FEATURE,
            };
          }),
          type: FEATURE_COLLECTION,
        };
        symbolLayers.push({
          ...circleLayerConfig,
          id: this.props.currentGoal,
          paint: {
            ...circleLayerConfig.paint,
            'circle-color': ['get', 'color'],
          },
          source: {
            ...circleLayerConfig.source,
            data: {
              ...circleLayerConfig.source.data,
              data: JSON.stringify(featureColl),
            },
          },
        });

        this.setState({
          hasGeometries: true,
        });
      }
    } else if (featureCollection!.features && !(featureCollection!.features.length > 0)) {
      alert(NO_GEOMETRIES_RESPONSE);
      this.setState({
        hasGeometries: false,
      });
    }
    const { geoData } = this.props;
    const { locations, bounds } = this.state;
    if (!locations || !geoData) {
      return false;
    }
    const layers: LineLayerObj[] | FillLayerObj[] | PointLayerObj[] | FlexObject = [
      {
        ...lineLayerConfig,
        id: `${MAIN_PLAN}-${geoData.jurisdiction_id}`,
        source: {
          ...lineLayerConfig.source,
          data: {
            ...lineLayerConfig.source.data,
            data: JSON.stringify(locations),
          },
        },
        visible: true,
      },
    ];
    if (symbolLayers.length) {
      symbolLayers.forEach((value: LineLayerObj | FillLayerObj | PointLayerObj) => {
        layers.push(value);
      });
    }
    // Build the site-config object for Gisida
    const config = ConfigStore(
      {
        appName: locations && locations.properties && locations.properties.jurisdiction_name,
        bounds,
        layers,
        style: this.props.basemapStyle,
      },
      GISIDA_MAPBOX_TOKEN,
      GISIDA_ONADATA_API_TOKEN,
      LayerStore
    );

    this.setState({ doRenderMap: true }, () => {
      // Initialize Gisida stores
      let layer;
      const currentState = store.getState();
      const activeIds: string[] = [];
      store.dispatch(Actions.initApp(config.APP));
      /** Make all selected tasks visible by changing the visible flag to true */
      const visibleLayers = config.LAYERS.map((l: FlexObject) => {
        layer = {
          ...l,
          id: l.id,
          visible: true,
        };
        return layer;
      });

      // load visible layers to store
      loadLayers(MAP_ID, store.dispatch, visibleLayers);

      // handles tasks with geometries
      if (this.state.hasGeometries && Object.keys(currentState[MAP_ID].layers).length > 1) {
        const allLayers = Object.keys(currentState[MAP_ID].layers);
        let eachLayer: string;
        for (eachLayer of allLayers) {
          layer = currentState[MAP_ID].layers[eachLayer];
          /** Filter out the main plan layer and the current selected goal tasks
           *  so we toggle off previously selected layers in the store
           */
          if (
            layer.visible &&
            !layer.id.includes(this.props.currentGoal) &&
            !layer.id.includes(MAIN_PLAN)
          ) {
            store.dispatch(Actions.toggleLayer(MAP_ID, layer.id, false));
          }
        }
        // handle tasks with no geometries
      } else if (!this.state.hasGeometries && Object.keys(currentState[MAP_ID].layers).length > 1) {
        Object.keys(currentState[MAP_ID].layers).forEach((l: string) => {
          layer = currentState[MAP_ID].layers[l];
          if (layer.visible && !layer.id.includes(MAIN_PLAN)) {
            activeIds.push(layer.id);
          }
        });
        if (activeIds.length) {
          activeIds.forEach((a: string) => {
            store.dispatch(Actions.toggleLayer(MAP_ID, a, false));
          });
        }
      }
    });
  }
}
export default GisidaWrapper;
