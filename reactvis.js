import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

const Chart = (props) => {

        return (
            <XYPlot
                width={300}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={[
                      { x: 1, y: 2 },
                      { x: 2, y: 3 },
                      { x: 3, y: 5 },
                      { x: 4, y: 4 },
                      { x: 5, y: 7 }
                    ]}/>
            </XYPlot>
        );
}
export default Chart;
