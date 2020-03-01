import React from 'react'
import { IOffence } from '../types/crime'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts'
import { groupBy } from 'lodash'
import { getRandomHexColor } from '../utils'

interface IVisualizeOffencesProps {
  offences: IOffence[]
}

interface ColorMap {
  [key: string]: string
}

const colorMapping: ColorMap = {}

function getColor(name: string): string {
  if (!(name in colorMapping)) colorMapping[name] = getRandomHexColor()
  return colorMapping[name]
}

const VisualizeOffences = (props: IVisualizeOffencesProps) => {
  const grouped = groupBy(props.offences, (x: IOffence) => x.Type)
  const data = Object.entries(grouped).map(([key, values]) => ({
    name: key,
    value: values.length,
    fill: getColor(key)
  }))
  return (
    <div className="">
      <p>
        <strong>Total: </strong>
        {props.offences.length}
      </p>
      <div style={{ height: '200px', width: '100%' }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#660000" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey={'value'} label={x => x.name} isAnimationActive={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VisualizeOffences
