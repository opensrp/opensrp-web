export const highcharts: any = jest.genMockFromModule(`highcharts`);
// So that Boost and Exporting modules don’t complain when running tests
highcharts.getOptions = () => ({
    plotOptions: {},
});
module.exports = highcharts;
