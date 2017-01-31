import React, { Component } from 'react';
import { View, Navigator, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DialogComponent, { DialogContent } from 'react-native-dialog-component';

import DialogExplorer from './DialogExplorer';
import AutoDialogSize from './containers/AutoDialogSize';
import FixedDialogSize from './containers/FixedDialogSize';

import SettingsDialog from './SettingsDialog';

export default class EXNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogSettings: {},
    };

    this.renderScene = this.renderScene.bind(this);
    this.onUpdateSettings = this.onUpdateSettings.bind(this);
    this.openSettingsDialog = this.openSettingsDialog.bind(this);
    this.openDialogComponent = this.openDialogComponent.bind(this);
  }

  onUpdateSettings(dialogSettings) {
    this.setState({ dialogSettings });
  }

  openDialogComponent() {
    this.dialogComponent.openDialog();
  }

  openSettingsDialog() {
    this.settingsDialog.openDialog();
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    // if (route.name === 'autoDialogSize') {
    //   return <AutoDialogSize navigator={navigator} />;
    // }
    // if (route.name === 'fixedDialogSize') {
    //   return <FixedDialogSize navigator={navigator} />;
    // }
    return <DialogExplorer navigator={navigator} openDialog={this.openDialogComponent} />;
  }

  render() {
    const navigationBar = (
      <Navigator.NavigationBar
        style={styles.navigationBar}
        routeMapper={{
          LeftButton: (route, navigator, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <TouchableOpacity
                style={[styles.navigationButton, styles.navigationLeftButton]}
                onPress={() => navigator.pop()}
              >
                <Text>
                  Back
                </Text>
              </TouchableOpacity>
            );
          },
          RightButton: (route, navigator, index) => {
            if (index === 0) {
              return (
                <TouchableOpacity
                  style={[styles.navigationButton, styles.navigationLeftButton]}
                  onPress={this.openSettingsDialog}
                >
                  <Text>
                    Settings
                  </Text>
                </TouchableOpacity>
              );
            }
            return null;
          },
          Title: (route) => (
            <Text style={styles.navigationTitle}>
              {route.title}
            </Text>
          ),
        }}
      />
    );

    const dialogSettings = this.state.dialogSettings;

    const dialogComponentContent = dialogSettings.dialogContentContainer ? (
      <DialogContent>
        <Text>
          Hello
        </Text>
      </DialogContent>
    ) : (
      <Text>
        Hello
      </Text>
    );

    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{
            name: 'index',
            title: 'Dialog Explorer',
          }}
          ref={(navigator) => {
            this.navigator = navigator;
          }}
          navigationBar={navigationBar}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          style={styles.navigator}
        />

        <SettingsDialog
          // {...this.state}
          onSettingsUpdated={this.onUpdateSettings}
          ref={(settingsDialog) => {
            this.settingsDialog = settingsDialog;
          }}
        />

        <DialogComponent
          title="Dialog"
          titleAlign="center"
          {...dialogSettings}
          ref={(dialogComponent) => {
            this.dialogComponent = dialogComponent;
          }}
        >
          {dialogComponentContent}
        </DialogComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
