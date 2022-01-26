import { css } from "../libs/css"

export function DefaultPage({ content }) {
	return <div style={css.bkCol("#FFF").exp().col()}>
		<div style={css.expX().sizeY(70).bkCol("#AAA")}></div>
		<div style={css.overflowY().exp().shrink()}>
			{content}
		</div>
	</div>
}