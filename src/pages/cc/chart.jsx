import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar';
import {ResponsiveLine} from '@nivo/line'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { color } from 'd3-color';




const CP = () => {
    const [gen_puser, setGen] = useState([]);
    const [m_performance, setM_Performance] = useState([]);
    const [ctcl_puser, setCtcl] = useState([]);
    const [conversion_rate, setCr] = useState([]);

    useEffect(() => {
        const getdata = async () => {
        try {
            // const response = await axios.get('http://hello00back.net/chart_sample/');
            const response = await axios.get('http://127.0.0.1:8000/chart_sample/');
            if (response.status === 200) {
                console.log('good')
                const gen_puser = response.data.data[0];
                const m_performance = response.data.data[1];
                const ctcl_puser = response.data.data[2];
                const conversion_rate = response.data.data[3];
                console.log(conversion_rate);
                setGen(gen_puser);
                setCtcl(ctcl_puser);
                setM_Performance(m_performance);
                setCr(conversion_rate);
            }else if (response.status !== 200){
                console.log("연결 실패");
            }
            
            // if (!isComponentMounted){
            //     return;
            // }
            
            }catch(error){
                console.log("try 실패", error);
            }
    }
    getdata();

    // const currentDate = new Date();

    // // Extract year, month, and day components
    // const year = currentDate.getFullYear();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    // const day = currentDate.getDate().toString().padStart(2, '0');

    // // Format the date as a string
    // const formattedDate = `${year}${month}${day}`;

    // console.log(formattedDate)

    

    // let isComponentMounted = true;

    
}, []);
const prepareData = (data) => {
    return data.map((item) => ({
      ...item,
      beginner: parseFloat(item.beginner.toFixed(3)),
      starter: parseFloat(item.starter.toFixed(3)),
      standard: parseFloat(item.standard.toFixed(3)),
      heavy: parseFloat(item.heavy.toFixed(3)),
    }));
  };
return(
    <div>
    <div style={{width:'800px', height:'500px', margin: '0 auto'}}>
        <ResponsiveBar 
            data = {prepareData(conversion_rate)}
            keys={[
                'beginner',
                'starter',
                'standard',
                'heavy'
            ]}
            indexBy='date'
            margin= {{ top: 50, right: 130, bottom: 50, left: 60}}
            
            padding={0.2}
            groupMode='grouped'
            valueScale={{type:'linear'}}
            indexScale={{type: 'band', round: true}}
            colors={{ scheme: 'nivo' }}
            borderColor='black'
            fill="red"
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'date',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'conversion rate',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={9}
            labelTextColor='black'

            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 125,
                    translateY: 21,
                    itemsSpacing: 5,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 16,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                    
                            }
                        }
                    ]
                }
            ]}
            role='application'
            ariaLabel='Nivo bar chart demo'
            layers={[
                'grid',
                'axes',
                'bars',
                (layerProps) => {
                  const { bars } = layerProps;
      
                  return bars.map((bar) => (
                    <g key={bar.id} transform={`translate(${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}>
                      <text
                        x={0}
                        y={10}
                        textAnchor="middle"
                        dominantBaseline="text-before-edge"
                        fill="rgba(255, 255, 255, 0.0)"
                        fontSize={11}
                        transform="rotate(0)"
                      >
                        {bar.data.value.toFixed(2)}
                      </text>
                    </g>
                  ));
                },
              ]}
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in date: "+e.indexValue}
    
        />
    </div>
    <div style={{width: '800px', height:'500px', margin: '0 auto'}}>
        <ResponsiveLine
            
            data = {m_performance}
            margin={{top: 10, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
            }}
            yFormat=" >-.2f"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Date',
                    legendOffset: 36,
                    legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Performance',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'nivo' }}
            lineWidth={4}
            pointSize={7}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={1}
            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
            pointLabelYOffset={-12}
            crosshairType="bottom"
            useMesh={true}
            legends={[
            {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 300,
            translateY: 10,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 78,
            itemHeight: 23,
            itemOpacity: 0.75,
            symbolSize: 13,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
            }
            ]}
    
        />
    </div>

    <div>

    </div>
    </div>
)
}

export default CP;