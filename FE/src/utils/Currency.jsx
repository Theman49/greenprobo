import { numericFormatter } from "react-number-format"
import PropTypes from "prop-types"

export function formatCurrency(value){
    return numericFormatter(value, {
        prefix: "Rp",
        thousandSeparator: true
    })
}

formatCurrency.propTypes = {
    value: PropTypes.string.isRequired
}