import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod/riverpod.dart';
import 'package:uuid/uuid.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image_cropper/image_cropper.dart';

const uuid = Uuid();
final ImagePicker _picker = ImagePicker();

class Images {
  XFile? croppedImage;
  XFile? originalImage;
  Images(this.croppedImage, this.originalImage);
}

final pickedImageProvider = StateNotifierProvider<PickedImageNotifier, Images>(
    (ref) => PickedImageNotifier(Images(null, null)));

class PickedImageNotifier extends StateNotifier<Images> {
  PickedImageNotifier(Images image) : super(image);

  Future<XFile?> getImage() async {
    state.originalImage = await _picker.pickImage(source: ImageSource.gallery);
    return state.originalImage;
  }

  Future<XFile?> cropImage() async {
    CroppedFile? croppedFile = await ImageCropper().cropImage(
      sourcePath: state.originalImage!.path,
      uiSettings: [
        AndroidUiSettings(
            toolbarTitle: 'squarer',
            backgroundColor: Colors.black,
            toolbarColor: Colors.black,
            toolbarWidgetColor: Colors.white,
            statusBarColor: Colors.white,
            activeControlsWidgetColor: Colors.white,
            hideBottomControls: true,
            cropFrameColor: Colors.transparent,
            cropGridColor: Colors.transparent,
            initAspectRatio: CropAspectRatioPreset.square,
            lockAspectRatio: true),
        IOSUiSettings(
          title: 'Cropper',
        )
      ],
    );
    if (croppedFile != null) {
      XFile image = XFile(croppedFile.path);
      state.croppedImage = image;
      return image;
    }
  }

  disposeDialogImage() {
    state.croppedImage = null;
    state.originalImage = null;
  }
}

@immutable
class Card {
  final String id;
  final String? text;
  final XFile? image;
  const Card({this.text, required this.id, this.image});
}

final cardProvider = StateNotifierProvider<CardNotifier, List<Card>>(
  (ref) => CardNotifier([Card(text: 'yooyo', id: uuid.v4())]),
);

class CardNotifier extends StateNotifier<List<Card>> {
  CardNotifier(List<Card>? loadedCard) : super(loadedCard ?? []);
  addCard(String? text, XFile image) {
    state = [...state, Card(id: uuid.v4(), text: text, image: image)];
  }

  addThought(String text) {
    state = [...state, Card(id: uuid.v4(), text: text)];
  }

  removeCard(String id) {
    state = state.where((item) => item.id != id).toList();
  }
}
