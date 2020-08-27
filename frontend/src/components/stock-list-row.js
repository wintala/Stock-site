import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {removeData, changeMultiplier} from "../reducers"


const Row = ({data}) => {
	const dispatch = useDispatch()
	const [multiplier, setMultiplier] = useState(data.multiplier)

	const handleDelete = (ticker) => {
		dispatch(removeData(ticker))
	}

	const handleMultiplierChange = (ticker, newMultiplier) => {
		dispatch(changeMultiplier(ticker, parseInt(newMultiplier)))
		setMultiplier(parseInt(newMultiplier))
	}

	return(
		<tr key={data.ticker}>
			<td>
				{data.ticker}
			</td>
			<td>
				Amount
				<input
					type="text"
					value={multiplier ? multiplier : 0}
					onChange={({ target }) => handleMultiplierChange(data.ticker, target.value)}
				/>
			</td>
			<td>
				<button onClick={() => handleDelete(data.ticker)}> Remove </button>
			</td>
		</tr>
	)
}

export default Row
