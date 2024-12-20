import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {getCategoryData, getChildInfo} from "../../../store/actions/touristActions";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
} from 'chart.js';

import {Bar} from "react-chartjs-2";
import {options} from "../cfg/options";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

export const Chart = () => {
    const dispatch = useDispatch();

    const isChild = useSelector(state => state.filter.isChild);
    const category = useSelector(state => state.filter.category);
    const chartData = useSelector(state => state.tourist.chartData);


    useEffect(() => {
        if (isChild) {
            dispatch(getChildInfo());
        } else {
            dispatch(getCategoryData(category));
        }
    }, [isChild, category]);


    return (
        <div style={{position: 'relative', height: '400px', width: '600px'}}>
            {
                chartData && (
                    <Bar data={chartData.data} options={options}/>
                )
            }
        </div>
    );
};
