export  const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: 'white',
            },
        },
        tooltip: {
            titleColor: 'white',
            bodyColor: 'white',
        },
    },
    scales: {
        x: {
            stacked: true,
            ticks: {
                color: 'white',
            },
        },
        y: {
            stacked: true,
            ticks: {
                color: 'white',
            },
        },
        y1: {
            position: 'right',
            ticks: {
                color: 'white',
            },
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};
