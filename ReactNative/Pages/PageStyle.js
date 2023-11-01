import { StyleSheet, Dimensions } from 'react-native'


const { height } = Dimensions.get("screen");
let eventHeight = height * 0.2;
let wineryHeight = height * 0.15;
let colorDark='#691A1A';  
let colorLight='#F0E6E8'

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'right',
    backgroundColor: '#fff'
  },
  logo: {
    width: 150,
    height: 80,
    margin: 20
  },
  scrollView: {
    borderBottomColor: colorLight,
    borderBottomWidth: 10,
    marginBottom: 10,

  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10

  },
  rowEvents: {
   
    padding: 10,
    borderWidth:1,
    borderColor:'#C397A0',
    borderStyle:'solid',
    borderRadius: 15,
    padding:10,
    margin:5,
    width:250
  },
  halfRow: {
    flex: 0.5,
    justifyContent: 'center',
    margin: 5
  },
  h4Text: {
    textAlign: 'right',
    padding: 10,
    fontWeight: 'bold',
    color:'gray'
  },
  event: {
    width: 230,
    height: eventHeight,
    marginTop: 10
  },
  winery: {
    alignItems: 'center',
    width: 100,
    height: wineryHeight,
    margin: 15,
    // borderStyle:'solid',
    // borderWidth:1,
    // borderColor:colorLight
  },
  wine: {
    alignItems: 'center',
    width: 80,
    height: 140,
    // margin: 15,
    padding: 20
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  textButton: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  inButtonActive: {
    color: colorDark,
  },
  inButtonInActive: {
    color: 'white',
  },
  toggleBox: {
    width: 172,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  toggleBoxActive: {
    backgroundColor: colorDark,
    borderColor: colorDark,
  },
  toggleBoxInActive: {
    backgroundColor: 'white',
    borderColor: colorDark,
  },
  button: {
    backgroundColor: colorDark,
    color: 'white',
    padding: 10,
    margin:10
  },
  input: {
    height: 40,
    borderColor: "#000000",
    marginBottom: 10,
    textAlign:'right'
  },
  textInput: {
    marginTop: 10,
    color: colorDark,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  avatar: {
    borderWidth: 3,
    
  },
  avatarReg: {
    borderColor: colorDark,
  },
  avatarGold: {
    borderColor: '#FFD700',
  },
  wineryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  wineRate: {
    height:100,
    width:100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: colorDark,
    color:colorDark,
    borderStyle: 'solid',
    marginLeft:40,
    fontSize:30,
    textAlign:'center',
    textAlignVertical:'center',
    paddingTop:25,
  },
  searchText:{
    fontSize: 30,
    textAlign:'center',
    borderColor: colorDark,
    color:colorDark,
    borderStyle: 'solid'
  },
  searchImage:{
    alignItems: 'center',
    width: 50,
    height: 100,
    marginRight: 30
  }
});