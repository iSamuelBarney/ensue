import React, { Component } from 'react'
import { initFlex, sampleDataObj } from './micro/constants'





const DataCard = ({data=[],section:s='',pagination:p=''}) => (
  <div className='section-card' style={{...initFlex,flexDirection:'column',flex:1}}>
    <div className='section-header' style={{...initFlex,justifyContent:'space-between',alignItems:'center',minHeight:'2.7vh'}}>
      <div className={`section-title ${s==='3' ? 'has-double' : ''}`}>{s==='3' ? <div className='double-title'><div>SECTION 3 TOP</div><div>SECTION 3 BOTTOM</div></div> : `SECTION ${s}`}</div>
      {p ? <div className='section-pagination'>{p}</div> : null}
    </div>
    <div className='section-body' style={{...initFlex,flex:10,flexDirection:'column'}}>
      {data.map((d,i)=>{
          return (
            <div key={i} className={`body-row ${s==='3'?`deuce`:``}`} style={{...initFlex,justifyContent:'center',alignItems:'center'}}>
              {Object.keys(d).map(Kd=>{
                switch(s) {
                  case '1':
                  case '2': {
                    let displayValue = ''
                    let isBob = false
                    switch(Kd) {
                      case 'boy': {
                        displayValue = <div style={{...initFlex}}><i className='fas fa-male'></i><span style={{marginLeft:'0.797vw'}}>1A2B3C</span></div>
                        break
                      }
                      case '1A2BC': {
                        displayValue = '123ab456cd'
                        break
                      }
                      case '123ab': {
                        isBob = true
                        displayValue = <div className='has-bob' style={{...initFlex,paddingLeft:'0.797vw',textAlign:'right',justifyContent:'flex-end'}}><i className='fas fa-female'></i><span style={{marginLeft:'0.797vw'}}>BOB</span></div>
                        break
                      }
                      case 'girl': {
                        displayValue = <div style={{width:'100%',textAlign:'center'}}><i className="fas fa-camera"></i></div>
                        break
                      }
                      default: {
                        displayValue = Kd
                      }
                    }
                    return (
                      <div key={Kd} className={`body-column ${isBob?'isbob':''}`} style={{...initFlex,flex:1,flexGrow:2,flexDirection:'column',justifyContent:'center',backgroundColor:isBob?'#EDEDED':'transparent'}}>
                        <div style={{color:Kd==='ABC12345678'?'#B9B9B9':'#424242'}}>{displayValue}</div>
                      </div>
                    )
                    break
                  }
                  default: {
                    return (
                      <div key={Kd} className='body-column' style={{...initFlex,flexDirection:'column',justifyContent:'space-around',alignItems:'flex-start'}}>
                        <div style={{width:'100%',textAlign:Kd==='girl'||Kd==='boy'?'center':Kd==='123ab'?'right':'left',color:Kd==='ABC12345678'?'#B9B9B9':'#424242'}}>{Kd==='girl'||Kd==='boy'?<i className={Kd==='boy' ? `fas fa-male` : `fas fa-female`}></i>:Kd}</div>
                        <div style={{width:'100%',textAlign:Kd==='girl'||Kd==='boy'?'center':d[Kd]==='photo'?'right':'left'}}>{d[Kd]==='photo'?<i className="fas fa-camera"></i>:d[Kd]}</div>
                      </div>
                    )
                  }
                }
              })}
            </div>
          )
      })}
    </div>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      height: window.innerHeight,
      width: window.innerWidth
    }
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  componentWillMount() {
    let data = []
    for(var i = 0; i < 50; i++){
      data = [...data,sampleDataObj]
    }
    this.setState({data})
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }
  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }
  render() {
    console.log(this)
    const { width, height } = this.state
    return (
      <div className="App">
        <div style={{flex:1,flexDirection:'column'}}>
          <div className='page-header'>PAGE NAME</div>
          <div className='sections-contain' style={{
              ...initFlex,
              position:'relative',
              flexDirection:width>768?'row':'column'
            }}>
            <div style={{...initFlex,flex:1,flexDirection:'column',maxHeight:(height-32.464),overflowY:'hidden'}}>
              <DataCard data={this.state.data.slice(0,17)} section='1' pagination='3 / 17' />
              <DataCard data={this.state.data.slice(0,6)} section='2' pagination='0 / 6' />
            </div>
            <div style={{...initFlex,flex:1,flexDirection:'column',maxHeight:(height-32.464),overflowY:'hidden'}}>
              <DataCard data={this.state.data.slice(0,6)} section='3' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
