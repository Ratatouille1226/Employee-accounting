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
                {name: "Денис К.", salary: 800, increase: false, star: false, id: 1},
                {name: "Владимир С.", salary: 1350, increase: true, star: true, id: 2},
                {name: "Юлия А.", salary: 1720, increase: false, star: false, id: 3},
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
       
    //Обозначение премии сотрудника
    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase, star: !item.star}
                }  
                return item;
            })
        }))
    }

    render() {
        //Получаем данные сколько всего сотрудников в компании и сколько получают премию
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />
    
                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>
    
                <EmployeesList 
                    data={this.state.data} 
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;