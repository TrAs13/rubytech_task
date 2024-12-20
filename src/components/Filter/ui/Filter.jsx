import {Button} from "../../Button";

import {useDispatch, useSelector} from 'react-redux';

import {updateCategory, updateChild} from "../../../store/actions/filterActions";

import '../style/style.css'

export const Filter = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.tourist.categories);
    const isChild = useSelector(state => state.filter.isChild)

    const handleChildChange = (event) => {
        dispatch(updateCategory("ALL"));
        dispatch(updateChild(event));
    };

    const handleCategoryChange = (event) => {
        dispatch(updateCategory(event.target.value));
    };

    return (
        <div className={"filter"}>
            {
                !isChild && (
                    <select className={"select"} onChange={handleCategoryChange}>
                        <option value="ALL">Все категории</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            )
                        })}
                    </select>
                )
            }
            <Button title={"Дети"} onEvent={handleChildChange}/>
        </div>
    )
}
