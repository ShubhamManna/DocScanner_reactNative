import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import DocumentScanner from "react-native-document-scanner";
import CustomCrop from "react-native-perspective-image-cropper";
import CameraRoll from "@react-native-community/cameraroll";


export default class scanning extends Component {
  render() {
    return (
      <View>
        <DocumentScanner
          useBase64
          saveInAppDocument={false}
          onPictureTaken={data =>
            this.setState({
              image: data.croppedImage,
              initialImage: data.initialImage,
              rectangleCoordinates: data.rectangleCoordinates
            })
          }
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          brightness={0.3}
          saturation={1}
          contrast={1.1}
          quality={0.5}
          onRectangleDetect={({ stableCounter, lastDetectionType }) =>
            this.setState({ stableCounter, lastDetectionType })
          }
          detectionCountBeforeCapture={5}
          detectionRefreshRateInMS={50}
          onPermissionsDenied={() => console.log("Permissions Denied")}
        />
        <Image
          source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
          resizeMode="contain"
        />
        <CustomCrop
          updateImage={this.updateImage.bind(this)}
          rectangleCoordinates={this.state.rectangleCoordinates}
          initialImage={this.state.initialImage}
          height={this.state.imageHeight}
          width={this.state.imageWidth}
          ref={ref => (this.customCrop = ref)}
          overlayColor="rgba(18,190,210, 1)"
          overlayStrokeColor="rgba(20,190,210, 1)"
          handlerColor="rgba(20,150,160, 1)"
          enablePanStrict={false}
        />
        <TouchableOpacity onPress={this.crop.bind(this)}>
          <Text>CROP IMAGE</Text>
        </TouchableOpacity>
        <TextInput  
          style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
          placeholder="Enter Document Name"  
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={CameraRoll.save(this.state.image, {photo, text})}  
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});