import React, { Component } from 'react';

class ApexChart extends Component {
  constructor(props) {
    super(props);

    // Estado inicial del componente
    this.state = {
      data: [],
      filter: 'all',
      fromDate: '',
      toDate: ''
    };
  }

  // Método para cargar los datos cuando el componente está montado
  componentDidMount() {
    this.fetchData();
  }

  // Método para obtener los datos de la API
  fetchData = () => {
    fetch('http://localhost:3000/historial')
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(error => console.error('Error al obtener los datos de la API:', error));
  };

  // Manejadores de eventos para los cambios en los filtros
  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleFromDateChange = event => {
    this.setState({ fromDate: event.target.value });
  };

  handleToDateChange = event => {
    this.setState({ toDate: event.target.value });
  };

  // Método para renderizar la tabla de datos
  renderTable = () => {
    const { data, filter, fromDate, toDate } = this.state;

    // Aplicar filtros según los valores seleccionados
    let filteredData = filter === 'all' ? data : data.filter(item => item.id_sensor.toString() === filter);

    if (fromDate && toDate) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.fecha_hora).getTime();
        const fromDateTimestamp = new Date(fromDate).getTime();
        const toDateTimestamp = new Date(toDate).getTime();
        return itemDate >= fromDateTimestamp && itemDate <= toDateTimestamp;
      });
    }

    // Renderizar la tabla con los datos filtrados
    return (
      <table className="min-w-full table-auto text-black border-collapse border border-black">
        {/* Encabezados de la tabla */}
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left border border-black">Fecha y Hora</th>
            <th className="text-center border border-black">Valor Numérico</th>
            <th className="text-right border border-black">Unidades</th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody className="bg-gray-100">
          {filteredData.map(item => (
            <tr key={item._id}>
              <td className="text-left border border-black">{item.fecha_hora}</td>
              <td className="text-center border border-black">{item.val_numerico}</td>
              <td className="text-right border border-black">{item.unidades}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Método para renderizar los filtros
  renderFilters = () => {
    return (
      <div className="flex flex-wrap items-start justify-center mb-4">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Filtros</h1>
        {/* Selector de sensor */}
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
          <label htmlFor="sensor" className="block text-black">Sensor:</label>
          <select id="sensor" className="form-select" onChange={this.handleFilterChange}>
            <option value="all">Todos los Sensores</option>
            <option value="1">Temperatura</option>
            <option value="2">Humedad</option>
          </select>
        </div>
        {/* Campo de fecha de inicio */}
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
          <label htmlFor="fromDate" className="block text-black">Desde:</label>
          <input id="fromDate" type="date" className="form-input" onChange={this.handleFromDateChange} />
        </div>
        {/* Campo de fecha de fin */}
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
          <label htmlFor="toDate" className="block text-black">Hasta:</label>
          <input id="toDate" type="date" className="form-input" onChange={this.handleToDateChange} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-auto md:w-full lg:w-3/4 xl:w-1/2">
          {/* Renderizar los filtros */}
          <div className="mb-4">{this.renderFilters()}</div>
          {/* Renderizar la tabla de datos */}
          <div className="overflow-x-auto">{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}

export default ApexChart;
