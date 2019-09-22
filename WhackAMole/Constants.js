import { Dimensions } from 'react-native';

// original grid size: 190x144
// original background size: 650x1024
export default Constants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    XR: Dimensions.get("screen").width / 650,
    YR: Dimensions.get("screen").height / 1024,
}
