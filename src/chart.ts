export const options = {
    responsive: true,
    maintainAspectRatio: false,
};

export const defaultData = (label: string = '') => ({
    labels: [],
    datasets: [
        {
            label: label,
            data: [],
            fill: false,
            borderColor: '#e74062',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
        },
    ]
});