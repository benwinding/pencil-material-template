rm -rf build/
mkdir build
# Build mobile
pushd mobile/
zip -r ../build/pencil-material-template-mobile.zip .
popd
# Build desktop
pushd desktop/
zip -r ../build/pencil-material-template-desktop.zip .
popd
# Build selectable
pushd selectable/
zip -r ../build/pencil-material-template-selectable.zip .
popd
