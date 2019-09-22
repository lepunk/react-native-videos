import { StyleSheet } from 'react-native';
import Constants from './Constants';

export default styles = StyleSheet.create({
    clearScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    clearedLevelContainer: {
        width: Constants.YR * 250,
        height: Constants.YR * 250,
        borderRadius: Constants.YR * 125,
        backgroundColor: '#ff1a1a',
        borderWidth: 5,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    clearedLevelText: {
        fontSize: 45,
        color: 'white',
        fontFamily: 'LilitaOne',
    },
    panel: {
        backgroundColor: '#29aecc',
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: Constants.YR * 350,
        height: Constants.YR * 200,
        marginTop: Constants.YR * -40
    },
    panelTitle: {
        fontSize: 45,
        color: 'black',
        fontFamily: 'LilitaOne',
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 1},
        textShadowRadius: 2
    },
    panelText: {
        fontSize: 31,
        color: 'white',
        fontFamily: 'LilitaOne',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1},
        textShadowRadius: 2,
        marginBottom: Constants.YR * 50
    },
    panelButtonsContainer: {
        position: 'absolute',
        height: Constants.YR * 80,
        bottom: Constants.YR * -40,
        alignItems: 'center',
        justifyContent: 'center',
        width: Constants.YR * 350,
        flexDirection: 'row'
    },
    panelButton: {
        width: Constants.YR * 80,
        height: Constants.YR * 80,
        borderRadius: Constants.YR * 40,
        backgroundColor: '#ff1a1a',
        borderWidth: 5,
        borderColor: 'white',
        marginLeft: Constants.XR * 15,
        marginRight: Constants.XR * 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panelButtonIcon: {
        width: Constants.YR * 35,
        height: Constants.YR * 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
