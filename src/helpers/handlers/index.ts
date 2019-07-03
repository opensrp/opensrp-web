import { GisidaMap } from 'gisida';
import { LngLat, Map } from 'mapbox-gl';
import { MAP_ID } from '../../constants';
import { EventData } from '../mapbox';
import './handlers.css';

/** declare globals interface */
declare global {
  interface Window {
    maps: mapboxgl.Map[];
  }
  const mapboxgl: typeof mapboxgl;
}
