import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class PostPage extends ConsumerWidget {
  PostPage({Key? key}) : super(key: key);
  final _postFormKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Center(
        child: Container(
          alignment: Alignment.center,
          width: 300,
          height: 800,
          child: Form(
              key: _postFormKey,
              child: Column(
                children: [
                  TextFormField(
                    validator: (text) {
                      if (text == null || text.isEmpty) {
                        return 'get some text inside!';
                      }
                      if (text.length < 2) {
                        return 'minimal huh';
                      }
                      return null;
                    },
                  )
                ],
              )),
        ),
      ),
    );
  }
}
