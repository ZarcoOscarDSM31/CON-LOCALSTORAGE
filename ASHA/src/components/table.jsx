import React, { Component } from 'react';

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: 'all',
      fromDate: '',
      toDate: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/historial')
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(error => console.error('Error al obtener los datos de la API:', error));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleFromDateChange = event => {
    this.setState({ fromDate: event.target.value });
  };

  handleToDateChange = event => {
    this.setState({ toDate: event.target.value });
  };

  renderTable = () => {
    const { data, filter, fromDate, toDate } = this.state;

    let filteredData = filter === 'all' ? data : data.filter(item => item.id_sensor.toString() === filter);

    if (fromDate && toDate) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.fecha_hora).getTime();
        const fromDateTimestamp = new Date(fromDate).getTime();
        const toDateTimestamp = new Date(toDate).getTime();
        return itemDate >= fromDateTimestamp && itemDate <= toDateTimestamp;
      });
    }

    return (
      <table className="min-w-full table-auto text-black border-collapse border border-black">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left border border-black">Fecha y Hora</th>
            <th className="text-center border border-black">Valor Numérico</th>
            <th className="text-right border border-black">Unidades</th>
          </tr>
        </thead>
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

  renderFilters = () => {
    return (
      <div className="flex flex-wrap items-start justify-center mb-4">
         <h1 className="text-2xl font-bold mb-2 sm:mb-0">Filtros</h1>
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
         
        </div>
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
          <div className="mr-3 mb-3 sm:mb-0">
            <label htmlFor="sensor" className="block text-black">Sensor:</label>
          </div>
          <div className="mb-3 sm:mb-0">
            <select id="sensor" className="form-select" onChange={this.handleFilterChange}>
              <option value="all">Todos los Sensores</option>
              <option value="1">Temperatura</option>
              <option value="2">Humedad</option>
            </select>
          </div>
        </div>
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
          <div className="mr-3 mb-3 sm:mb-0">
            <label htmlFor="fromDate" className="block text-black">Desde:</label>
          </div>
          <div className="mb-3 sm:mb-0">
            <input id="fromDate" type="date" className="form-input" onChange={this.handleFromDateChange} />
          </div>
        </div>
        <div className="flex-none w-full sm:w-auto sm:flex-grow sm:flex sm:items-center sm:justify-start sm:mb-4">
          <div className="mr-3 mb-3 sm:mb-0">
            <label htmlFor="toDate" className="block text-black">Hasta:</label>
          </div>
          <div className="mb-3 sm:mb-0">
            <input id="toDate" type="date" className="form-input" onChange={this.handleToDateChange} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-auto md:w-full lg:w-3/4 xl:w-1/2">
          <div className="mb-4">{this.renderFilters()}</div>
          <div className="overflow-x-auto">{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}

export default ApexChart;
