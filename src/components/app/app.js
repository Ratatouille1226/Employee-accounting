import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Воображаемая API, сделал свою маленькую бд в стейте :)
            data: [
                {name: "Денис К.", salary: 800, increase: false, id: 1},
                {name: "Владимир С.", salary: 1350, increase: true, id: 2},
                {name: "Юлия А.", salary: 1720, increase: false, id: 3},
            ]
        }
        this.maxId = 4;
    }
    //Удаление сотрудников
    deleteItem = (id) => {
        this.setState(({data}) => {
            //Используем метод фильтер чтобы не изменять напрямую стэйт и не нарушать иммутабельность
            return {
               data: data.filter(item => item.id !== id)
            }
        })
    }
    //Добавление новых сотрудников
    addItem = (name, salary) => {
        //Данные нового сотрудника
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++
        }
        //Новый массив с новым сотрудником
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    render() {
        return (
            <div className="app">
                <AppInfo />
    
                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>
    
                <EmployeesList data={this.state.data} onDelete={this.deleteItem}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;