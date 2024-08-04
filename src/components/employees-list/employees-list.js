import EmployeesListItem from "../employees-list-item/employees-list-item";

import "./employees-list.css";

const EmployeesList = ({data}) => {
    //Динамеческое формирование сотрудников, подтягиваем из нашей воображаемой API
    const element = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem key={id} {...itemProps} />
        );
    });

    return (
        <ul className="app-list list-group">
            {element}
        </ul>
    );
};

export default EmployeesList;