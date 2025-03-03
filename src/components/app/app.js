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
            ],
            term: '',
            filter: 'all'
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

    //Поиск сотрудников компании
    searchEmp = (items, term) => {
        //Возвращаем неизмененный массив если пользователь удалил строку которую он написал
        if (term.length === 0) {
            return items;
        }
        //Фильтруем массив
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    //Фильтрация сотрудников (повышение и зп больше 1000 долларов)
    filterPost = (items, filter) => {
        switch (filter) {
            case 'star':
                return items.filter(item => item.star);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default: return items;
        }
    }

    //Подъём состояния, записываем данные и компонента search panel в стэйт term
    onSearchUpdate = (term) => {
        this.setState({term});
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        //Получаем данные сколько всего сотрудников в компании и сколько получают премию
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        //Отфильтрованный массив поиска и фильтрации сотрудников по разделам
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />
    
                <div className="search-panel">
                    <SearchPanel onSearchUpdate={this.onSearchUpdate}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;