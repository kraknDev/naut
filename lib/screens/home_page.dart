import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:cross_file_image/cross_file_image.dart';
import '../providers/card.dart';
import '../style/theme.dart';

class HomePage extends ConsumerWidget {
  HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pickedImage = ref.watch(pickedImageProvider);
    final theme = ref.watch(themeNotifier);
    final _cardFormKey = GlobalKey<FormState>();
    final _cardFormController = TextEditingController();

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
    cardDialogContent() {
      return Form(
          key: _cardFormKey,
          child: TextFormField(
            controller: _cardFormController,
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
            style: const TextStyle(height: 1, fontSize: 17),
            decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'What you want to share this time?'),
          ));
    }

    cardDialog() {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            XFile? pickedImageDialog = pickedImage.croppedImage;
            return StatefulBuilder(builder: (context, setState) {
              return Dialog(
                  child: SizedBox(
                      width: 200,
                      height: 400,
                      child: Column(children: [
                        pickedImageDialog != null
                            ? Column(
                                children: [
                                  Container(
                                      padding: const EdgeInsets.all(4),
                                      height: 90,
                                      child: Image(
                                          image:
                                              XFileImage(pickedImageDialog!))),
                                  const Text("Card")
                                ],
                              )
                            : const Text("Thought"),
                        cardDialogContent(),
                        IconButton(
                          onPressed: () async {
                            await ref
                                .read(pickedImageProvider.notifier)
                                .getImage();
                            pickedImageDialog = await ref
                                .read(pickedImageProvider.notifier)
                                .cropImage();
                            setState(() {
                              pickedImageDialog = pickedImageDialog;
                            });
                          },
                          icon: const Icon(Icons.attach_file),
                        ),
                        TextButton(
                            child: const Text('Share'),
                            onPressed: () {
                              if (_cardFormKey.currentState!.validate()) {
                                if (pickedImageDialog != null) {
                                  print(pickedImage.toString());
                                  ref.read(cardProvider.notifier).addCard(
                                      _cardFormController.text,
                                      pickedImageDialog!);
                                } else {
                                  ref
                                      .read(cardProvider.notifier)
                                      .addThought(_cardFormController.text);
                                }
                                ref
                                    .read(pickedImageProvider.notifier)
                                    .disposeDialogImage();
                                Navigator.pop(context, _cardFormController);
                              }
                            }),
                      ])));
            });
          });
    }

    final cards = ref.watch(cardProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text("naut"),
        actions: [
          Center(
              child: IconButton(
                  onPressed: () {
                    cardDialog();
                  },
                  icon: const Icon(
                    Icons.face,
                  )))
        ],
      ),
      body: Container(
          decoration: BoxDecoration(color: theme.backgroundColor),
          child: ListView.builder(
              itemCount: cards.length,
              itemBuilder: (context, index) {
                index = cards.length - 1 - index;
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
                    key: Key(cards[index].id),
                    dismissThresholds: const {
                      DismissDirection.startToEnd: 0.3,
                      DismissDirection.endToStart: 0.5
                    },
                    onDismissed: (DismissDirection direction) {
                      ref
                          .read(cardProvider.notifier)
                          .removeCard(cards[index].id);
                    },
                    child: InkWell(
                      child: Container(
                          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                          child: Column(
                            children: [
                              Center(
                                  child: Container(
                                padding: EdgeInsets.fromLTRB(30, 0, 0, 0),
                                child: Wrap(
                                  alignment: WrapAlignment.start,
                                  direction: Axis.horizontal,
                                  children: [
                                    Container(
                                        padding: const EdgeInsets.fromLTRB(
                                            0, 0, 4, 0),
                                        height: 40,
                                        width: 40,
                                        child: const CircleAvatar(
                                          backgroundImage:
                                              AssetImage('assets/niceguy.png'),
                                          radius: 100,
                                        )),
                                    Container(
                                      padding: const EdgeInsets.fromLTRB(
                                          0, 5, 30, 0),
                                      child: Text(
                                        cards[index].text.toString(),
                                        style: TextStyle(
                                          color: theme.primaryTextColor,
                                          fontSize: 18,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              )),
                              if (cards[index].image != null)
                                Container(
                                    padding: EdgeInsets.fromLTRB(0, 13, 0, 0),
                                    child: Image(
                                        image: XFileImage(cards[index].image!)))
                            ],
                          )),
                      onTap: null,
                    ));
              })),
    );
  }
}
