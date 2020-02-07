const chartArgument = {
    chart: { type: 'line', width: 819.2 },
    legend: { align: 'right', layout: 'vertical', verticalAlign: 'middle' },
    responsive: {
        rules: [
            {
                chartOptions: {
                    legend: { align: 'center', layout: 'horizontal', verticalAlign: 'bottom' },
                },
                condition: { maxWidth: 5000 },
            },
        ],
    },
    series: [{ data: [10, 10, 9], name: 'x axis label' }],
    subtitle: { text: '' },
    title: { text: '' },
    tooltip: {
        backgroundColor: 'white',
        borderColor: '#DADCE0',
        borderRadius: 10,
        borderWidth: 1,
        shadow: {
            color: '#D7D7E0',
            offsetX: 0,
            offsetY: 2,
            opacity: 0.2,
            width: 8,
        },
    },
    xAxis: { categories: ['undefined 2019', 'September 2019', 'undefined 2019'] },
    yAxis: { title: { text: '' } },
};

export default chartArgument;
