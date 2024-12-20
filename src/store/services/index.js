export const getChildData = (state) => {
    const filteredState = state.filter((item) => item.child);
    const values = calculateYearlySums(filteredState);
    const { years, sums, cagr } = processData(values);

    const preparedCagr = calculateCagr(sums, cagr);
    const data = createChartData(years, [
        getDatasetsForChartLine(preparedCagr),
        getDatasetsForChartBar("Дети", sums),
    ]);

    return { data, amount: sumArray(sums) };
};

export const getCategoryData = (state, curCategory, categories) => {
    const years = [...new Set(state.map(item => item.year.toString()))];
    let totalAmount = 0;
    const data = { labels: years, datasets: [] };

    if (curCategory === "ALL") {
        const { totalCagr, totalSum, datasets } = processAllCategories(state, categories, years);
        const totalSumsArr = Object.values(totalSum);
        const totalSumsCagr = Object.values(totalCagr);
        const preparedCagr = calculateCagr(totalSumsArr, totalSumsCagr);

        data.datasets.push(getDatasetsForChartLine(preparedCagr));
        datasets.forEach((dataset) => data.datasets.push(dataset));
        totalAmount = sumArray(totalSumsArr);
    } else {
        const filteredState = state.filter((item) => item.category == curCategory);
        const values = calculateYearlySums(filteredState);
        const { sums, cagr } = processData(values);
        const categoryTitle = categories.find(cat => cat.id == curCategory)?.title || "";
        const preparedCagr = calculateCagr(sums, cagr);
        totalAmount = sumArray(sums);
        data.datasets.push(getDatasetsForChartLine(preparedCagr));
        data.datasets.push(getDatasetsForChartBar(categoryTitle, sums));
    }

    return { data, amount: totalAmount };
};

const processAllCategories = (state, categories, years) => {
    const totalCagr = initializeYearlyObject(years);
    const totalSum = initializeYearlyObject(years);
    const datasets = [];

    categories.forEach((category) => {
        const categoryData = state.filter((item) => item.category === category.id);
        const categoryValues = calculateYearlySums(categoryData);
        const { years: iterationYears, sums, cagr } = processData(categoryValues);

        const curSum = initializeYearlyObject(years);
        iterationYears.forEach((year, idx) => {
            totalCagr[year] += cagr[idx];
            totalSum[year] += sums[idx];
            curSum[year] += sums[idx];
        });

        datasets.push(getDatasetsForChartBar(category.title, curSum));
    });

    return { totalCagr, totalSum, datasets };
};

const calculateCagr = (sums, cagr) =>
    cagr.map((item, index) => Math.round((sums[index] / item) * 100 - 100));

const initializeYearlyObject = (years) => {
    const obj = {};
    years.forEach(year => obj[year] = 0);
    return obj;
};

const createChartData = (labels, datasets) => ({
    labels,
    datasets
});

const processData = (data) => {
    const years = Object.keys(data);
    const sums = years.map(year => data[year].sum);
    const cagr = years.map(year => data[year].cagr);
    return { years, sums, cagr };
};

const getDatasetsForChartBar = (label, data) => {
    const color = getRandomColor();
    return {
        label,
        type: "bar",
        data: Object.values(data),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        fill: false,
    };
};

const getDatasetsForChartLine = (data) => {
    const color = getRandomColor();
    return {
        label: 'Темп прироста, %(год к году)',
        type: 'line',
        data,
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        backgroundColor: color,
        fill: false,
        yAxisID: 'y1',
    };
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const calculateYearlySums = (data) => {
    const yearlySums = {};

    data.forEach(entry => {
        const year = entry.year;
        const count = entry.count_tourist;
        const count_before = entry.count_tourist_before_year;

        if (!yearlySums[year]) {
            yearlySums[year] = { sum: 0, cagr: 0 };
        }
        yearlySums[year].sum += count;
        yearlySums[year].cagr += count_before;
    });

    return yearlySums;
};

function sumArray(array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
