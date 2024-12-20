import {useSelector} from "react-redux";

import '../style/style.css'

export const Header = () => {
    const totalAmount = useSelector(state => state.tourist.chartData?.amount);

    return (
        <header className={"header"}>
            <div>
                Динамика туристического потока
            </div>
            <div>
                Итого: {totalAmount} млн
            </div>
        </header>
    )
}
