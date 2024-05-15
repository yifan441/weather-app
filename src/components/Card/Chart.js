import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import AnnotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, AnnotationPlugin);

//FIXME: standardize y-axis for more intuitive comparison

const times = [
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '1:00',
  '12:00',
];

const timeOfDayMapping = {
  Morning: {
    leftmostTime: 6,
    startTime: 8,
    endTime: 12,
    rightmostTime: 15,
  },
  Afternoon: {
    leftmostTime: 10,
    startTime: 12,
    endTime: 17,
    rightmostTime: 19,
  },
  Evening: {
    leftmostTime: 15,
    startTime: 17,
    endTime: 21,
    rightmostTime: 23,
  },
};

function Chart({ data, time }) {
  const start = timeOfDayMapping[time].leftmostTime;
  const end = timeOfDayMapping[time].rightmostTime;
  const timePoints = times.slice(start, end + 1);

  const temperatureData = [];

  data.days[0].hours.forEach((hour) => {
    temperatureData.push(hour.temp.toFixed());
  });

  const tempSubset = temperatureData.slice(start, end + 1);

  const minTemp = data.days[0].tempmin - 1;
  const maxTemp = data.days[0].tempmax + 1;

  const options = {
    plugins: {
      annotation: {
        annotations: {
          startLine: {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: times[timeOfDayMapping[time].startTime],
            borderColor: 'black',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: times[timeOfDayMapping[time].startTime],
              enabled: true,
              position: 'top',
            },
          },
          endLine: {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: times[timeOfDayMapping[time].endTime],
            borderColor: 'black',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: times[timeOfDayMapping[time].endTime],
              enabled: true,
              position: 'top',
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: time,
          color: 'black',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        suggestedMin: minTemp, // Minimum y-axis value
        suggestedMax: maxTemp, // Maximum y-axis value
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    // maxHeight: 300,
  };
  const chartData = {
    labels: timePoints,
    datasets: [
      {
        label: 'Temperature',
        data: tempSubset,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };
  return (
    <div>
      <Line className="line-chart" options={options} data={chartData} />
    </div>
  );
}

export default Chart;
