
// var Table = React.createClass({
//   render: function() {
//     return ()
//   }
// });
// <td> <img src={tableRow.img} /> </td>
// reverse: function() {
  //     this.setState({data:this.state.data.sort(function(a, b) {
  //       return a.recent-b.recent;
  //     })
  //   });
  // },

var Rows = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
      alltimeState: "hideIcon",
      recentState: ""
    };
  },
  
  sortour: function (sortColumn) {
    var component = this;
    var url;
    if (sortColumn === 'recent') {
      url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
      this.setState({alltimeState: "hideIcon", recentState: ""});
    } else {
      url = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
      this.setState({recentState: "hideIcon", alltimeState: ""});
    }
    $.getJSON(url, function(newData, err) {
      component.setState({data: newData});
    });
    return true;
  },
  
  render: function() {
    var Tablerows = this.state.data.map(function(tableRow, key) {
      return (
          <tr>
            <td> {key+1} </td>
            <td> {tableRow.username} </td>
            <td> {tableRow.alltime} </td>
            <td> {tableRow.recent} </td>
          </tr>
        );
    });
  
  return (
    <table className="table table-hover"> 
        <tr> 
          <th> No. </th>
          <th> Name </th>
          <th className="clickable" onClick={this.sortour.bind(this,'alltime')}> Points <i className={"fa fa-caret-down " + this.state.alltimeState} aria-hidden="true"></i></th>
          <th className="clickable" onClick={this.sortour.bind(this,'recent')}> Last 30 days <i className={"fa fa-caret-down " + this.state.recentState} aria-hidden="true"></i></th>
        </tr>
        {Tablerows}
      </table>
    );
  }
});

$.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function(data, err) {
  ReactDOM.render(
    <Rows data={data}/> , document.getElementById('app')
    );
});