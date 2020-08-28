import React, {useState, useEffect} from "react"
import {Line} from "react-chartjs-2"
import {useSelector} from "react-redux"
import Row from "./stock-list-row"

const Graph = () => {
	const dataSets = useSelector(state => state)
	// setit pilkottava saman mittaisiksi jos aikasarjat eripituiset (esim jos yritys listautunut vasta viimevuosina)
	const [cropedSets, setCropedSets] = useState(null)
	const [chartData, setChartData] = useState(null)
	// jos true -> graafiin summattu kuvaaja, jos false jokaiselle oma kuvaaja
	const [combined, setCombined] = useState(false)
	const [dateRange, setDaterange] = useState({start: "2020-06-01", end: "2020-07-31"})
	const [options, setOptions] = useState([
		{name: "Close", on: true},
		{name: "Open", on: false},
		{name: "High", on: false},
		{name: "Low", on: false}
	])


	useEffect(() => {
		// tarvitaan sarjojen pituuksien yhdenmukaistamiseen
		const sharedDates = () => {
			const dates = dataSets.map(d => d.values.map(v => v.Date))
			return dates.shift().filter(v => dates.every((a) => a.indexOf(v) !== -1))
		}

		// yhdistetty sulkeutumisarvo kaikista valituista instrumenteista chartjs haluamassa muodossa
		const combinedCloseDataset = (data, dates) => (
			{
				label: data.map(d => d.ticker).join(" + ") + " Close",
				// nice oneliner :D
				data: [...Array(data[0].values.length).keys()].map(i => data.map(d => d.values.slice(dates.start, dates.end).map(x => x.Close * d.multiplier)[i]).reduce((a, b) => (a + b))),
				borderColor: "rgb(255, 80, 80)",
				hoverBorderWidth: 0,
				hoverBackgroundColor: "rgb(0, 153, 255)",
			}
		)
		
		// lista kaikista valituista arvoista
		const distinctDatasets = (data, dates) => {
			let sets = []
			let colors = ["rgb(153, 51, 153)", "rgb(0, 0, 153)", "rgb(204, 204, 0)", "rgb(0, 153, 255)", "rgb(255, 153, 0)", "rgb(0, 204, 0)"]
	
			for (const o of options) {
				if (o.on === true) {
					sets.push(
						data.map(d => (
							{
								label: `${d.ticker} ${o.name}`, 
								data: d.values.slice(dates.start, dates.end).map(x => x[o.name] * d.multiplier),
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

		if (dataSets.length === 0) {
			setChartData(null)
			return void(0)
		}

		const commonDates = sharedDates()
		const newCroppedSets = dataSets.map(s => ({...s, values: s.values.filter(v => commonDates.includes(v.Date))}))

		// jos lisättävä yritys listautunut vatsa valitus aloitus päivän jälkeen asetetaan aloitus ensimmäiseen rekordiin
		if (!commonDates.includes(dateRange.start)) {
			setDaterange({...dateRange, start: commonDates[0]})
		}

		const newDateIndecies = {
			start: commonDates.indexOf(dateRange.start), 
			end: commonDates.indexOf(dateRange.end)
		}
		setCropedSets(newCroppedSets)
		setChartData(
			{
				labels: commonDates.slice(newDateIndecies.start, newDateIndecies.end),
				datasets: combined ? [combinedCloseDataset(newCroppedSets, newDateIndecies)]: distinctDatasets(newCroppedSets, newDateIndecies)
			}
		)

	}, [dataSets, dateRange, options, combined]);
	

	const handleOptionChanhe = (option) => setOptions(options.map(o => o.name === option ? {...o, on: !o.on}: {...o, on: false}))

	const stockList = () => {
		return(
			<table>
				<tbody>
					<tr>
						<th>
							Symbol
						</th>
						<th>
							Amount
						</th>
						<th>
							Remove
						</th>
					</tr>
					{cropedSets.map(x => <Row key={x.ticker} data={x}/>)}
				</tbody>
			</table>
		)
	}


	return(
		chartData ? 
		<div>
			<div className="graph">
				<Line 
					data={chartData}
					options={{
						responsive: true,
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
						},
						scales: {
							xAxes: [{
								gridLines: {
									display: false
								},
									ticks: {
											display: false //this will remove only the label
									}
							}]
						}
					}}
				/>
			</div>
			<div className="options">
				{stockList()}
				<div>
					close
					<input type="checkbox" checked={options[0].on} onChange={() => handleOptionChanhe("Close")}/>
					open
					<input type="checkbox" checked={options[1].on} onChange={() => handleOptionChanhe("Open")}/>
					high
					<input type="checkbox" checked={options[2].on} onChange={() => handleOptionChanhe("High")}/>
					low
					<input type="checkbox" checked={options[3].on} onChange={() => handleOptionChanhe("Low")}/>
					<br/>
					{dataSets.length !== 1 ?
					<>
					combined close
					<input type="checkbox" checked={combined} onChange={() => setCombined(!combined)}/>
					<br/>
					</> :
					null}
					Start date:
					<select key="start" value={dateRange.start} onChange={(e) => setDaterange({...dateRange, start:e.target.value})}>
						{cropedSets[0].values.map(v => <option key={v.Date}>{v.Date}</option>)}
					</select>
					<br/>
					End date:
					<select key="end" value={dateRange.end} onChange={(e) => setDaterange({...dateRange, end:e.target.value})}>
						{cropedSets[0].values.map(v => <option key={v.Date}>{v.Date}</option>)}
					</select>
					</div>
			</div>
		</div>:
		null
	)
}

export default Graph