import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
    //Делаем вид что получаем данные с сервера :)   (Пока работаем без API)
    const data = [
        {name: "Денис К.", salary: 800, increase: false, id: 1},
        {name: "Владимир С.", salary: 1350, increase: true, id: 2},
        {name: "Юлия А.", salary: 1720, increase: false, id: 3},
    ];

    return (
        <div className="app">
            <AppInfo />

            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>

            <EmployeesList data={data}/>
            <EmployeesAddForm />
        </div>
    );
}

export default App;