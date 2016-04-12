import React, {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  Clipboard,
  Platform,
  View,
  Dimensions,
  StatusBar,
} from 'react-native'

// utility functions
function genChars(from: number, to: number) {
  let items = []
  for (let i=from; i<to; i++){
    items.push(String.fromCharCode(i))
  }
  return items
}

function copytext(text) {
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
}

class App extends Component {

  constructor(){
    super();
    this.state= {
      page: 0,
      perPage: 90,
      maxCheckpoint: 500, // dinamically set
      items: []
    };
  }

  componentDidMount(){
    const {items, page, perPage} = this.state
    const {height} = Dimensions.get('window')
    this.setState({maxCheckpoint: height})

    this.setState({items: genChars(page * perPage, (1 + page) * perPage)})
  }

  loadPage(pageNum){
    const {height} = Dimensions.get('window')

    const {items, page, perPage, maxCheckpoint} = this.state
    this.setState({items: [ ...items, ...genChars(page * perPage, (1 + page) * perPage)], page: pageNum, maxCheckpoint: maxCheckpoint + height})
    console.log(page)
  }

  handleCopy(el: string){
    if (Platform.OS === 'web') {
      copytext(el)
    } else { // Use RN APIs
      Clipboard.setString(el)
    }
    alert(`Copied in clipboard: ${el}`)
  }

  onPressInfo() {
    alert('UTF8Map https://github.com/corso-javascript/react-native-web-utf8map')
  }

  onScroll(ev) {
    let { maxCheckpoint } = this.state
    let currentY = null
    if (Platform.OS === 'web') {
      currentY = this.refs._scrollView.getScrollableNode().scrollTop
    } else { // Use RN APIs
      currentY = ev.nativeEvent.contentOffset.y
    }

    if (currentY + 50 > maxCheckpoint) {
      this.loadPage(this.state.page+1);
    }
  }

  render() {

    const InfoButton = () => (
      Platform.OS === 'android' ? (
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this.onPressInfo}
          >
          <View style={{flex:1,  alignItems: 'center', justifyContent:'center'}}>
            <Text style={styles.fontUI}>
            ★ info
            </Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableHighlight style={{flex:1,  alignItems: 'center', justifyContent:'center'}} underlayColor="darkblue"
          onPress={this.onPressInfo}>
          <View >
            <Text style={styles.fontUI}>
            ★ info
            </Text>
          </View>
        </TouchableHighlight>
      )
    )

    return (
      <View style={{flexDirection:'column',flex:1, alignItems: 'stretch', justifyContent:'center'}}>
        {Platform.OS === 'android' ? (
          <StatusBar
          backgroundColor='#0144A9'
          barStyle="light-content"
          />
        ) : null}
        <View style={{flexDirection:'row', height:50}}>

          <View style={{width:100,  alignItems: 'center', justifyContent:'center', backgroundColor:'rgba(51, 130, 212, 0.7)'}}>
            <Text style={styles.fontUI}>
              ¯\_(ツ)_/¯
            </Text>
          </View>

          <View style={[styles.elementUI, styles.logoView]}>
            <Text style={[styles.fontUI, styles.logoText]}>
              UTF8Map
            </Text>
          </View>

        </View>

         <ScrollView style={[styles.scrollView, styles.horizontalScrollView]}
          ref='_scrollView'
          onScroll={(ev) => this.onScroll(ev) }
          scrollEventThrottle={5000}
          >

         <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start',backgroundColor:'#EEE'}}>

           {this.state.items.map((el,i) => (
             <Text key={i} style={{paddingLeft:10, paddingTop:5, fontSize:40, width:50, height:50, margin:3, backgroundColor:'white'}}
                onPress={() => { this.handleCopy(el) } }>
               {el}
             </Text>
           ))}

        </View>
          <TouchableHighlight style={{ backgroundColor:'#EEE', alignItems:'center', justifyContent:'center', height:100}}
          onPress={() => {this.loadPage(this.state.page+1) } } >
          <Text style={{fontSize:30}}>⬇</Text>
          </TouchableHighlight>

         </ScrollView>

         <View style={{flexDirection:'row', height:50, backgroundColor:'#1E6ADC'}}>

           <View style={{flex:1,  alignItems: 'center', justifyContent:'center'}}>
             <Text style={styles.fontUI}>
               {this.state.page}
             </Text>
           </View>

           <View style={{flex:1,  alignItems: 'center', justifyContent:'center'}}>
             <Text style={styles.fontUI}>
               {Platform.OS}
             </Text>
           </View>

           <InfoButton />

         </View>

      </View>
  )}
}

const styles = StyleSheet.create({
  elementUI: {
    backgroundColor: '#1E6ADC',
  },
  fontUI: {
    color:'white',
    fontSize: 20,
  },
  logoView: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  logoText:{
    fontSize: 30,
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    flexDirection:'column',
    flex: 1,
  },
})

export default App
