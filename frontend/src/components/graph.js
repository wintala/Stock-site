import React, {useState} from "react"
import {Line} from "react-chartjs-2"
import {useSelector} from "react-redux"
import Row from "./stock-list-row"

const Graph = () => {
	const dataSets = useSelector(state => state)
	const [combined, setCombined] = useState(false)
	const [options, setOptions] = useState([
		{name: "Close", on: true},
		{name: "Open", on: false},
		{name: "High", on: false},
		{name: "Low", on: false}
	])
	const [dateRange, setDaterange] = useState({start: "2020-06-01", end: "2020-08-17"})

	const dateIndeces = dataSets[0] ? 
		{
			start: dataSets[0].values.map(x => x.Date).indexOf(dateRange.start), 
			end: dataSets[0].values.map(x => x.Date).indexOf(dateRange.end)
		} : null


	const combinedCloseDataset = () => (
		{
			label: dataSets.map(d => d.ticker).join(" + ") + " Close",
			// nice oneliner :D
			data: [...Array(dataSets[0].values.length).keys()].map(i => dataSets.map(d => d.values.slice(dateIndeces.start, dateIndeces.end).map(x => x.Close * d.multiplier)[i]).reduce((a, b) => (a + b))),
			borderColor: "rgb(255, 80, 80)",
			hoverBorderWidth: 0,
			hoverBackgroundColor: "rgb(0, 153, 255)",
		}
	)

	const distinctDatasets = () => {
		let sets = []
		let colors = ["rgb(153, 51, 153)", "rgb(0, 0, 153)", "rgb(204, 204, 0)", "rgb(0, 153, 255)", "rgb(255, 153, 0)", "rgb(0, 204, 0)"]

		for (const o of options) {
			if (o.on === true) {
				sets.push(
					dataSets.map(d => (
						{
							label: `${d.ticker} ${o.name}`, 
							data: d.values.slice(dateIndeces.start, dateIndeces.end).map(x => x[o.name] * d.multiplier),
							borderColor: colors.pop(),
							hoverBorderWidth: 0,
							hoverBackgroundColor: "rgb(255, 80, 80)",
						})
					)
				)
			}
		}

		const mergedSets = [].concat.apply([], sets)
		
		return (mergedSets)
	}

	const chartData = dataSets.length !== 0 ? 
	{
		labels: dataSets[0].values.slice(dateIndeces.start, dateIndeces.end).map(x => x.Date),
		datasets: combined ? [combinedCloseDataset()]: distinctDatasets()
	} : null

	const handleOptionChanhe = (option) => setOptions(options.map(o => o.name === option ? {...o, on: !o.on}: {...o, on: false}))

	const stockList = () => {
		
		return(
			<table>
				<tbody>
					{dataSets.map(x => <Row key={x.ticker} data={x}/>)}
				</tbody>
			</table>
		)
	}


	return(
		chartData ? 
		<>
			<Line 
				data={chartData} 
				options={{
					elements: {
						point: {
							radius: 0
						}
					},
					tooltips: {
						enabled: true,
						mode: 'index',
						intersect: false,
					},
					hover: {
						mode: 'index',
						intersect: false
					}
				}}
			/> 
			<div>
				{stockList()}
			</div>
			<div>
				close
				<input type="checkbox" checked={options[0].on} onChange={() => handleOptionChanhe("Close")}/>
				open
				<input type="checkbox" checked={options[1].on} onChange={() => handleOptionChanhe("Open")}/>
				high
				<input type="checkbox" checked={options[2].on} onChange={() => handleOptionChanhe("High")}/>
				low
				<input type="checkbox" checked={options[3].on} onChange={() => handleOptionChanhe("Low")}/>
			</div>
			{dataSets.length !== 1 ?
				<div>
				combined close
				<input type="checkbox" checked={combined} onChange={() => setCombined(!combined)}/>
				</div> :
				null}
				<div>
					Start date:
					<select key="start" value={dateRange.start} onChange={(e) => setDaterange({...dateRange, start:e.target.value})}>
						{dataSets[0].values.map(v => <option key={v.Date}>{v.Date}</option>)}
					</select>
					End date:
					<select key="end" value={dateRange.end} onChange={(e) => setDaterange({...dateRange, end:e.target.value})}>
						{dataSets[0].values.map(v => <option key={v.Date}>{v.Date}</option>)}
					</select>
				</div> :
		</>:
		null
	)
}

export default Graph