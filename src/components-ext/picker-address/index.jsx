import React from 'react'
import PropTypes from 'prop-types'
import { Picker, Popup } from '../../components'
import { PROVINS, CITYS, AREAS } from './utils'
import './index.scss'

class PickerAddress extends React.Component {
  constructor(props) {
    super(props)
    this.address = []
    this.state = {
      provins: {
        list: PROVINS,
        defaultValue: props.defaultValue[0],
        displayValue: name => {
          return name
        }
      },
      citys: {
        list: CITYS[props.defaultValue[0]],
        defaultValue: props.defaultValue[1],
        displayValue: name => {
          return name
        }
      },
      areas: {
        list: AREAS[props.defaultValue[1]],
        defaultValue: props.defaultValue[2],
        displayValue: name => {
          return name
        }
      }
    }
  }

  handleChangeProvin = provin => {
    this.setState(state => ({
      provins: {
        ...state.provins,
        list: provins,
        defaultValue: provin
      },
      citys: {
        ...state.citys,
        list: citys[provin],
        defaultValue: citys[provin][0]
      },
      areas: {
        ...state.areas,
        list: areas[citys[provin][0]],
        defaultValue: areas[citys[provin][0]][0]
      }
    }))
    this.address = []
    this.address.push(provin)
    this.address.push(citys[provin][0])
    this.address.push(areas[citys[provin][0]][0])
    this.props.onChange(this.address)
  }

  handleChangeCity = city => {
    this.address[1] = city
    this.address[2] = areas[city][0]
    this.setState(state => ({
      areas: {
        ...state.areas,
        list: areas[city],
        defaultValue: areas[city][0]
      }
    }))
    this.props.onChange(this.address)
  }

  handleChangeArea = area => {
    this.address[2] = area
    this.props.onChange(this.address)
  }

  handleClose = () => {
    this.props.onConfirm(this.address)
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  render() {
    return (
      <div className="ui-picker-address">
        <Popup
          onConfirm={this.handleClose}
          onCancel={this.handleCancel}
          visible={this.props.visible}
        >
          <Picker
            onChange={this.handleChangeProvin}
            data={this.state.provins}
          />
          <Picker onChange={this.handleChangeCity} data={this.state.citys} />
          <Picker onChange={this.handleChangeArea} data={this.state.areas} />
        </Popup>
      </div>
    )
  }
}

PickerAddress.propTypes = {
  defaultValue: PropTypes.array.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

PickerAddress.defaultProps = {
  defaultValue: ['广东省', '深圳市'],
  onConfirm: () => {},
  onCancel: () => {},
  onChange: () => {},
  visible: false
}

export default PickerAddress
