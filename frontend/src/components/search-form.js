import React, {useState} from "react"
import services from "../services"
import {dataAdd} from "../reducers"
import {useDispatch, useSelector} from "react-redux"

const SearchForm = () => {
	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const data = useSelector(state => state)


	const handleSearch = (e) => {
		e.preventDefault()
		setLoading(true)
		const search = e.target.search.value
		services.findTickers(search).then(r => {
			setResult(r)
			setLoading(false)
		})
	}

	const resultTable = () => {
		if (result.ResultSet.Result.length === 0) {
			return <div id="no-match">No matches</div>
		}
		return(
				<table id="result-table">
					<tbody>
						<tr>
							<th>
								Company
							</th>
							<th>
								Symbol
							</th>
							<th>
								exchDisp
							</th>
						</tr>
						{result.ResultSet.Result.map(o => 
							<tr key={o.symbol} onClick={() => addData(o.symbol)}>
								<td>
									{o.name}
								</td>
								<td>
									{o.symbol}
								</td>
								<td>
									{o.exchDisp}
								</td>
							</tr>)}
					</tbody>
				</table>
		)
	}

	const addData = (ticker) => {
		if (!data.map(x => x.ticker).includes(ticker)) {
			services.getData(ticker).then(values =>
				dispatch(dataAdd({ticker, values}))
			)
		}
	}

	return(
			<div id="search">
				<form onSubmit={handleSearch}>
					<h2>Search company</h2>
					<div>
						<input
							name="search"
						/>
					</div>
					<button>Search</button>
				</form>
				{loading ? 		
				<div className="dot-loading">
					<div></div>
					<div></div>
					<div></div>
					<div></div> 
				</div> : 
				null}
				{result ? 
				resultTable() :
				null}
			</div>
	)
}

export default SearchForm