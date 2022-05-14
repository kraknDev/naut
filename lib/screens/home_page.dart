import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/thought.dart';
import 'package:image_picker/image_picker.dart';
import 'package:cross_file_image/cross_file_image.dart';

final ImagePicker _picker = ImagePicker();
final imageProvider = FutureProvider<XFile?>((ref) async {
  final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
  return image;
});

class HomePage extends ConsumerWidget {
  HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final _thoughtFormKey = GlobalKey<FormState>();
    final _thoughtFormController = TextEditingController();
    AsyncValue<XFile?> imageSelected = ref.watch(imageProvider);
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
    thoughtDialogContent() {
      return Form(
          key: _thoughtFormKey,
          child: TextFormField(
            controller: _thoughtFormController,
            keyboardType: TextInputType.multiline,
            validator: (text) {
              if (text == null || text.isEmpty) {
                return 'you are missing something!';
              }
              if (text.length < 2) {
                return 'minimalism, right';
              }
              return null;
            },
            maxLines: 9,
            style: const TextStyle(height: 1, fontSize: 15),
            decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'What you want to share this time?'),
          ));
    }

    thoughtDialog() {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              content: thoughtDialogContent(),
              actions: [
                imageSelected.when(
                    data: (image) {
                      return Container(
                          padding: const EdgeInsets.fromLTRB(0, 0, 4, 0),
                          height: 40,
                          width: 40,
                          child: CircleAvatar(
                            backgroundImage:
                                Image(image: XFileImage(image!)).image,
                            radius: 100,
                          ));
                    },
                    loading: () => const CircularProgressIndicator(),
                    error: (err, _) => Text('error ${err}')),
                IconButton(
                  onPressed: () {
                    ref.refresh(imageProvider);
                  },
                  icon: Icon(Icons.attach_file),
                ),
                TextButton(
                    child: const Text('Share'),
                    onPressed: () {
                      imageSelected.when(
                          data: (image) {
                            if (_thoughtFormKey.currentState!.validate()) {
                              ref.read(thoughtProvider.notifier).addThought(
                                  _thoughtFormController.text, image);
                              _thoughtFormController.clear();
                              Navigator.pop(context, _thoughtFormController);
                            }
                          },
                          loading: () => const CircularProgressIndicator(),
                          error: (err, _) => Text('error ${err}'));
                    })
              ],
            );
          });
    }

    final thoughts = ref.watch(thoughtProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text("naut"),
        actions: [
          Center(
              child: IconButton(
                  onPressed: () {
                    thoughtDialog();
                  },
                  icon: const Icon(
                    Icons.face,
                  )))
        ],
      ),
      body: ListView.builder(
          itemCount: thoughts.length,
          itemBuilder: (context, index) {
            index = thoughts.length - 1 - index;
            return Dismissible(
                confirmDismiss: (DismissDirection direction) async {
                  if (direction == DismissDirection.startToEnd) {
                    const snackBar = SnackBar(content: Text("love you"));
                    ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    return false;
                  } else {
                    const snackBar = SnackBar(content: Text("baby!"));
                    ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    return true;
                  }
                },
                background: Container(
                  color: Colors.green,
                ),
                secondaryBackground: Container(
                  alignment: Alignment.topRight,
                  color: Colors.red,
                ),
                key: Key(thoughts[index].id),
                dismissThresholds: const {
                  DismissDirection.startToEnd: 0.3,
                  DismissDirection.endToStart: 0.5
                },
                onDismissed: (DismissDirection direction) {
                  ref
                      .read(thoughtProvider.notifier)
                      .removeThought(thoughts[index].id);
                },
                child: InkWell(
                  child: Container(
                      padding: const EdgeInsets.fromLTRB(10, 10, 0, 10),
                      child: Column(
                        children: [
                          Center(
                            child: Wrap(
                              alignment: WrapAlignment.start,
                              direction: Axis.horizontal,
                              children: [
                                Container(
                                    padding:
                                        const EdgeInsets.fromLTRB(0, 0, 4, 0),
                                    height: 40,
                                    width: 40,
                                    child: const CircleAvatar(
                                      backgroundImage:
                                          AssetImage('assets/niceguy.png'),
                                      radius: 100,
                                    )),
                                Container(
                                  padding:
                                      const EdgeInsets.fromLTRB(0, 5, 40, 0),
                                  child: Text(
                                    thoughts[index].text.toString(),
                                    style: const TextStyle(
                                      fontSize: 18,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          if (thoughts[index].image != null)
                            SizedBox(
                                child: Image(
                                    image: XFileImage(thoughts[index].image!)))
                        ],
                      )),
                  onTap: null,
                ));
          }),
    );
  }
}
