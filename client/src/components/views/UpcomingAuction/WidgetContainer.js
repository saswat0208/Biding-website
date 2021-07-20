/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Widget from './Widget';
import Badge from 'react-bootstrap/Badge';
import './widgetcontainercss.css';
class WidgetContainer extends Component {
  render() {
    console.log('inside', this.props.array);
    console.log('length', this.props.array.length);

    return (
      <div className="widget-container-div"
        style={{ backgroundImage: 'url(/light.jpg)' }}>

        <div>

          <h1><Badge variant="dark">{this.props.section} Auctions</Badge></h1>
        </div>
        <div>
          {
            this.props.array.length == 0 &&

                        <h2><Badge variant="danger">
                            Sorry!!! No {this.props.section} Auctions </Badge></h2>

          }
        </div>
        <div>
          {

          }

          {


            this.props.array.map((i) => {
              console.log('i', i);
              return <Widget key={i} img={i.images[0]} />;
            })

          }


        </div>

      </div>
    );
  }
}
export default WidgetContainer;


