import "./app-filter.css";

const AppFilter = (props) => {
    //Динамическое создание кнопок (проще будет изменять и работать с ними)
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'star', label: 'На повышение '},
        {name: 'moreThen1000', label: 'З/П Больше 1000$'},
    ];

    const button = buttonsData.map(({name, label}) => {
        //Активность кнопке
        const active = props.filter === name;
        const clazz = active ? "btn-light" : "btn-outline-light"; 

        return (
            <button 
                className={`btn ${clazz}`} 
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                {label}   
            </button>
        )
    });

    return (
        <div className="btn-group">
            {button}
        </div>
    );   
};

export default AppFilter;