import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class Voice2TextService {
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;
  private subject = new Subject<any>();
  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'bn-BD';
    this.recognition.continuous = true;
    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

        this.tempWords = transcript;
        this.sendText(this.tempWords);
      console.log(transcript);

      // let interim_transcript = '';
      // for (let i = e.resultIndex; i < e.results.length; ++i) {
      //   if (e.results[i].isFinal) {
      //     this.text += e.results[i][0].transcript;
      //   } else {
      //     interim_transcript += e.results[i][0].transcript;
      //   }
      // }
      // console.log(interim_transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log ('Speech recognition started');
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log ('End speech recognition');
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log('End speech recognition');
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
    this.sendText(this.text);
  }
  sendText(msg: string) {
    this.subject.next(msg);
  }
  getText(): Observable<string> {
    return this.subject.asObservable();
  }
}
