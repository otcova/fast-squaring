function colorFrom(...color) {
    if (color.length == 4) return `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`
    if (color.length == 3) return `rgb(${color[0]},${color[1]},${color[2]})`
    if (color.length == 2) return `rgba(${color[0]},${color[0]},${color[0]},${color[1]})`
    if (color.length == 1) {
        if (typeof color[0] == "string") return color[0]
        return `rgb(${color[0]},${color[0]},${color[0]})`
    }
}

class Css {

    maxSize(maxWidth, maxHeight) { return this.#new({ width: maxWidth, height: maxHeight }) }
    size(width, height) { return this.#new({ width, height }) }
    sizeX(width) { return this.#new({ width }) }
    sizeY(height) { return this.#new({ height }) }
    exp(width = 100, height = 100) { return this.#new({ width: width + "%", height: height + "%" }) }
    expX(width = "100%") { return this.#new({ width }) }
    expY(height = "100%") { return this.#new({ height }) }

    margin(margin, dir="lrtb", ...args) {
        const config = {}
        if (dir.includes("l")) config.marginLeft = margin
        if (dir.includes("r")) config.marginRight = margin
        if (dir.includes("t")) config.marginTop = margin
        if (dir.includes("b")) config.marginBottom = margin
        if (args.length > 0) return this.#new(config).margin(...args)
        return this.#new(config)
    }
    padding(padding, dir="lrtb", ...args) {
        const config = {}
        if (dir.includes("l")) config.paddingLeft = padding
        if (dir.includes("r")) config.paddingRight = padding
        if (dir.includes("t")) config.paddingTop = padding
        if (dir.includes("b")) config.paddingBottom = padding
        if (args.length > 0) return this.#new(config).padding(...args)
        return this.#new(config)
    }
    border(borderWidth, borderColor = "#000", borderStyle = "solid") { return this.#new({ borderWidth, borderColor, borderStyle }) }
    noBorder() { return this.#new({border: "none"}); }
    
    row() { return this.axis(0) }
    col() { return this.axis(1) }
    
    axis(vertical=0, mainAxis="start", crossAxis="center") {
        return this.#new({display: "flex", flexDirection: vertical ? "column" : "row", justifyContent: mainAxis, alignItems: crossAxis})
    }
    
    shrink(flexShrink = 1) { if (flexShrink === true) { flexShrink = 1 } else if (flexShrink === false) { flexShrink == 0 } return this.#new({ flexShrink }) }
    float(float) { return this.#new({ float }) }

    img(url) { return this.#new({ background: `url('${url}')`, backgroundSize: "contain" }) }
    bkCol(...color) { if (color.length == 0) {return this.noBk()} return this.#new({ backgroundColor: colorFrom(...color) }) }
    noBk() { return this.#new({background: "none"})}
    
    cursor(cursor) { return this.#new({ cursor }) }
    fontSize(fontSize) { return this.#new({ fontSize }) }
    fontWeight(fontWeight="bold") { return this.#new({ fontWeight }) }
    color(...color) { return this.#new({ color: colorFrom(...color) }) }
    
    overflow(overflowX="auto", overflowY="auto") {return this.#new({overflowX,overflowY})}
    overflowX(overflowX="auto") {return this.#new({overflowX})}
    overflowY(overflowY="auto") {return this.#new({overflowY})}
    scrollY() {return this.#new({overflowY: "scroll"})}
    
    whiteSpace(whiteSpace="pre-wrap") {return this.#new({whiteSpace})}
    
    render(render) {
        if (!render) return this.#new({display:"none"})
        return this
    }
    
    #new(props) { return Object.assign(new Css(), this, props); }
}

export const css = new Css();

window.css = css;