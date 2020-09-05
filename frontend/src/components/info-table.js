import React from "react";

const InfoTable = ({chartData}) => {
	if (!chartData) {
		return null
	}

	const valueChange = (dataSet) => {
		const change = Math.round((dataSet.data.slice(-1)[0] - dataSet.data[0]) / dataSet.data[0] * 10000) / 100
		return change
	}

	const highestValue = (dataSet) => Math.round(Math.max(...dataSet.data) * 100) / 100

	const lowestValue = (dataSet) => Math.round(Math.min(...dataSet.data) * 100) / 100

	return (
		<div id="info-table">
			<h2>Graph info</h2>
			<table>
				<tbody>
					<tr>
						<th>
							Series
						</th>
						<th>
							Change 
						</th>
						<th>
							Highest
						</th>
						<th>
							Lowest
						</th>
					</tr>
					{chartData.datasets.map(s => (
						<tr key={s.label}>
							<td>
								{s.label}
							</td>
							<td>
								{valueChange(s) + "%"}
							</td>
							<td>
								{highestValue(s) + ""}
							</td>
							<td>
								{lowestValue(s) + ""}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default InfoTable