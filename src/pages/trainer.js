import { css } from "../libs/css";
import { DefaultPage } from "./defaultPage";

export function Trainer() {
	const comps = Array.from({length: 600}, (_, i) => <div key={i}>{i.toString(2)}</div>)
	
	return <DefaultPage content={
		<div style={css.col()}>
			{comps}
		</div>
	}/>
}