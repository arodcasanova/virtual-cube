var cubeFace = 0;
var cubeCell = 4;
var dictionary = { W:0, O:1, B:2, G:3, R:4, Y:5}
var cellColor = state.state.charAt(cubeCell);
var cellTone = dictionary[cellColor];

// Create an AudioContext
let audioContext = null
let source1 = null
let audioElement = null
let bellSoundSrc = 'https://00e9e64bacc8b6d93c28142e3097a6fd4f02bf077922978bbb-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEvY0rnhhl6kPynLulFWbCjeNtcQ3so5FToA6GXv3QLdFTludmmyS5jSqNWlqD1c0zivvjxCXbSaLUioCKg6u4jInbgejYd06uxzuR1MgRfranz_XOYDOtBnpHV3srqfaC3EjShOAM1_uQwYZGBWWztPL0E86xLt22-oMIqA_5VbCu6oeYZPp2Gl6K1_didKgNXOQ1zqcimIfarqtD5Ujo2QR4A4N5ruHS_H92eethUma2rhebj9_oBr7Zj5OzCBm-o1d-yLvwE3MbEGdODeSGX7cCirHyfqX9XEUix9DceqwAcGlcdlumRETv2CASGYHHPWpz2rKK8nns1VLfp3W5zYOBceHl3DmYcbKGEV4pUavLP19gj4oa68t2xYS4ZouJoLr7MYEPXvibMWmBKMhw6WZsJ3GGXYF8xkzOMERcSx4oAf4D6ZA__S12y1eMjTYxSmmEKIwOOLLo5jVXhqRDC47qdp7EyP58MLC8JweV2Q4-YO7y-RE_-sG0iD4IU9QIqGGzuEIgUZW5KwweYa-7iBW85QE_WFJs3XK6F4FNAtYzRnBV9zRzwXThjJ9a9yJNzLFIVbFqje6N2Gn89pXBYVPVQEtO4U1frgR6BxZ6_NKNfTnIZWHBRgXf3vWLVnLKnJc6Qh8QQdf8KELCiyFFGo19fJGPfow15EHbfzq5C3KilewoGJWl6AJK64-8jGL6dXMg5P0Y2RbN5zcDof7InaJF4NijmvT06-oRhYwN242NabB90JVVTjQPONt5MaKMiM2xX9yFR2WyZpl8CFOPNGo_9t7g';
let rotateSoundSrc = 'https://00e9e64bacb5ebbc23f49bcc6731289e87c118642efe15d279-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fswish.wav?qk=AD5uMEtMAsdEeNqHY1Y56AmwwtuN_3sKX2KhO-VdeANMLyh4MO3XFdezdIG_932rJiVm_PLUIXgW3skXnDv-FEFGxl6muuV2NKB8yfuJZU021SV7bkRfOqvAaGNJQ1bJEZIhGuXdBCFedprDxo7FdXvu0XjNr43i3SkWJD966Y9j1bIuL-g15hUQSsP7rq6Pz8p3VowX3dbQ4MTgPryyrc2DWRgBpuu_2gAz-MlDbxu5mP_MTxmwqP8Q3YP7Y7hsD3PFoA0O_fxF274EwFoOjpIdHf-K7r3Ns2yQX0sMxoGH0697pE-pnSSB7nlE_2lQVPQACury-0cUr08YBdavpEGlewGqtOCpaPGTcIniTA-4AQOP8CfgwztOcnr6Ex6AMWzseaevyhJqBLLhiD6-xTi-U6ImIXlYCqsY1wRQPW7uDGnhac2CXLwmedm791duE6wQxhP6uuadlVYKcYKuBTk3rkgJSZ-e7Y7wq-SSt2UCExKOBL7IBtEjBcQX3jlA7hNW5s9YOcJfC4D21RN0NrYFG5LU443j0LwJr_S26V6TTDNQXJ3suU1Sa0Nhxhdd9l4wxSfr4B3s4HMQxRPk0kkl4ylxW7M-BrVOEzWiGjVFjGcxQbr7zj3FvIz1b1x2NPdJ3Zb1X8rMkab1sgvgPkZLbBUiss4ziv_8ry375aH3NVGuAY0rnRcyvLQc_3JyA-Mw9vbq-Lg_tflSOA-13Z5fP6xKuZCXJBAmLsP7v7wZhYtQWsUhXdp1xh0pMhjFIkF86evwtkTVKkTOv40kyggPUUL-o_bulA';
let blueSoundSrc = 'https://00e9e64bace4460956d5d217262c3c31e867bd9b07c0ee1467-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEu8Wu-hc2byskmRxYEH9JTXuU5zE9rYVyMEayt6mWudOJyWmVFsP6TmAqwGB19l-MU1eWLbWItJNOJszlE-vb4HliGXK9vQoOLOl4bF047QWzinXi7XNnSMrQU5LantzWNw1pqCrwU0COIZNaK_fpOyQ3WzbNfcSfr1Fb9NVw_8xu4YwPW98rMR0zIVroQ0SbfmYY1qCjZXkjavTtFGZQGU7cA6fJyQlApIc7m2o4MuAeZ6gIbNQe8FlH6cC1jVxRShJ-B0zbFfCfpsBb_2HNNHMcpNGLNE0srwtju0M-PMJWhOZ34Vxmu06kd1KOA2Uvklov-yvhstn82bkQrjhHhu9BdfaLdx63eLOUSXA7Mr71cDr4O96zA9OfVTqwV6ZLOdfSoTvbO1sRuRthebCEvX2mTamIPAOaRtVylSYHXRSh05PZKq_bu_K8n87sk6Wm2HrHZ_sVlLotPCiLBDZIRsRGTMhUkOFOfB8CPf28FRyfoz5LKgIUfCm82UYqsVgfVH3rLDgqPp20oTvfQwH-P5MauEm7BepIeuc8XAAzVIkiIHLjlAtNZogoMw3ooh6Fp9lIwkOG7ObIIVAqPQ9eKXnvq3uiXr8bUtEFSJDEv5iYPwqwjhX3JWqit1Kn04gwvkBXNgAnVySpie8WW8KqOXTgpsmrGSuzmU4FbK8I6bix8eDi_ilQ86NUjuavNjZL3lUaYkA0eETRaWFIY3MRKCzsq028t8RNmIORJ_5aH20e67q2UtmBSLehhWqGaBBxxmpUi0MLM-GjA2PMYTz8rDrFVB_g';
let outBoundSrc = 'https://00e9e64bacf04c5be5f909ba5567a04eec60aa01b4528e14c2-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Foutofbounds.mp3?qk=AD5uMEsbGeiWfBIM1sr4d7KU1mKDQRRdF9l0jTHGO2JVe5QoCcQTRS_2WGml6TQXBpo0aUmiLUZVHjuxg9KJLuDHYpQ3NRgINdWPxeSGqH9OTR-gVx_SRLlrhSMcdhHVpigOplC558PxATxg83mhKrxO259I2cmwwmEhDBWGxFPqQTU_EEjAAKgWlDdS6azGlfGmklXkA60cdyGEfNzSGh7wDbY9UVwtr9LgVeBba9lFiRKEyt5TUMYH8pn1E9c-T59GtP8UGqaMpvu9jpCPeabImbIN0JAV_J0KH_YMI3Qwoc9cFbuuY3vjS1eJ-huYZJQaDS2JxpxYmhbN2BPPPDDlDHnYzp45VSM9Yuv09b8lWPDk1_8X6KXfW_74fkscLfwd2LuUAUy-ZTiF3-wN8lA_R4z7lzua-ueu-cXRG8bFefvQina4u5E7EW9JDnHnwh7Hw8lI0cDgRJDMwExBC3Z_oRvehXOtRqTlGGc0h1jIzR2xImT7YAR7IEM8GQbkZtkVsnyXZVULXO9XuJeKRg6VSzO5gewOTKLWBGL9hH2hZY8LI61P2K7HpUGKlnFaIVQpQSGjtnMvI837WJJ-4d0ibGaG-TOcUEAypME4CvhKHMzILw-yi5vsSJhYo8CzeTmRQqZC9zqD5YUcYbl3MPgWjNEftLSoJglMGV1wdf34XJy5gnmpbakdK7vqjItVNf-1I3t9qbRrR2vjTp-JQNjvtyofMQYyl4ChofMyC0hDRDa3rxTpwAIu6YKtCcgdRRBXB-LDwHcLLeTsWRe-QqRv_-noXe7hwg';
let didAddListener = false
console.log(state)


function myFunction() {
  if (audioContext == null) {
    let audioContext = new AudioContext();
    
    // Create a (first-order Ambisonic) Resonance Audio scene and pass it
    // the AudioContext.
    let resonanceAudioScene = new ResonanceAudio(audioContext);

    // Connect the scene’s binaural output to stereo out.
    resonanceAudioScene.output.connect(audioContext.destination);

    // Define room dimensions.
    // By default, room dimensions are undefined (0m x 0m x 0m).
    let roomDimensions = {
      width: 0,
      height: 0,
      depth: 0,
    };

    // Define materials for each of the room’s six surfaces.
    // Room materials have different acoustic reflectivity.
    let roomMaterials = {
      // Room wall materials
      left: 'marble',
      right: 'marble',
      front: 'marble',
      back: 'marble',
      // Room floor
      down: 'grass',
      // Room ceiling
      up: 'transparent',
    };

    // Add the room definition to the scene.
    resonanceAudioScene.setRoomProperties(roomDimensions, roomMaterials);

    // Create an AudioElement.
    audioElement = document.createElement('audio');
    audioElement2 = document.createElement('audio');



    // Load an audio file into the AudioElement.
    audioElement.crossOrigin = "anonymous";
    audioElement2.crossOrigin = "anonymous";

    // audioElement.src = './bell-C2.mp3';
    audioElement.src = bellSoundSrc;
    audioElement2.src = rotateSoundSrc;

    // Generate a MediaElementSource from the AudioElement.
    let audioElementSource = audioContext.createMediaElementSource(audioElement);
    let audioElementSource2 = audioContext.createMediaElementSource(audioElement2);


    // Add the MediaElementSource to the scene as an audio input source.
    source1 = resonanceAudioScene.createSource();
    source2 = resonanceAudioScene.createSource();
    audioElementSource.connect(source1.input);
    audioElementSource2.connect(source2.input);


    // Set sound source parameters.
    source1.setRolloff('logarithmic');
    source2.setRolloff('logarithmic');
    source1.setGain(0.25);
    source2.setGain(0.25);

    if (!didAddListener) audioElement.play();
  }


  // Make array to contain source coordinates.
  var cellXpos = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
  var cellYpos = [0, 0, 0, 1, 1, 1, 0, 0, 0];
  var cellZpos = [1, 1, 1, 0, 0, 0, -1, -1, -1];


  // Set coordinates for sound sources.
  var currentCell = 4
  source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
  source2.setPosition(0, 1, 0);



  // Make array to contain sound clips of color names.
  var colorClips = [];
  colorClips[0] = 'https://00e9e64bacc8b6d93c28142e3097a6fd4f02bf077922978bbb-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEvY0rnhhl6kPynLulFWbCjeNtcQ3so5FToA6GXv3QLdFTludmmyS5jSqNWlqD1c0zivvjxCXbSaLUioCKg6u4jInbgejYd06uxzuR1MgRfranz_XOYDOtBnpHV3srqfaC3EjShOAM1_uQwYZGBWWztPL0E86xLt22-oMIqA_5VbCu6oeYZPp2Gl6K1_didKgNXOQ1zqcimIfarqtD5Ujo2QR4A4N5ruHS_H92eethUma2rhebj9_oBr7Zj5OzCBm-o1d-yLvwE3MbEGdODeSGX7cCirHyfqX9XEUix9DceqwAcGlcdlumRETv2CASGYHHPWpz2rKK8nns1VLfp3W5zYOBceHl3DmYcbKGEV4pUavLP19gj4oa68t2xYS4ZouJoLr7MYEPXvibMWmBKMhw6WZsJ3GGXYF8xkzOMERcSx4oAf4D6ZA__S12y1eMjTYxSmmEKIwOOLLo5jVXhqRDC47qdp7EyP58MLC8JweV2Q4-YO7y-RE_-sG0iD4IU9QIqGGzuEIgUZW5KwweYa-7iBW85QE_WFJs3XK6F4FNAtYzRnBV9zRzwXThjJ9a9yJNzLFIVbFqje6N2Gn89pXBYVPVQEtO4U1frgR6BxZ6_NKNfTnIZWHBRgXf3vWLVnLKnJc6Qh8QQdf8KELCiyFFGo19fJGPfow15EHbfzq5C3KilewoGJWl6AJK64-8jGL6dXMg5P0Y2RbN5zcDof7InaJF4NijmvT06-oRhYwN242NabB90JVVTjQPONt5MaKMiM2xX9yFR2WyZpl8CFOPNGo_9t7g';
  colorClips[1] = 'https://00e9e64bacbe9c5ee0cbffc0465d20ee56c13b2d157fb05700-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Forange.mp3?qk=AD5uMEudBvqm3Mcn5xJngG5ucq5eaoHuxCY97QYJaFBgur_NyEZTuy9cw7tVNzrLOL-ZFPI-wclqgMU70l4qfi_oIBRpHZqqzZnv1xWUpkh7NogCav7mLd4RW8-B1TOlA6kWEILZ5Kc28CCrqqSa7nkk8l4dEf_o2epm0fKi7WjkRj9p7TkU4dasIB7N2hnL_OMI0uS4c0rMAo2JG0a0wCXdDnYjzNBVX1Xe1tFIFu1WTh2sP8yOgiNM7stHtRczBQifyjumeckp1cJx_G3qhWszN-1WpQ-mv3uikFKMoDeWzAMObd56PwHh4oqbgnlf_0XehktehL9Dk2ArbTsvKxsn6ngXlelu_2Oma3bl25VusE1WfZ5clriyBAZM0XzdtKkRfm166C1Iopty2rQlKXrf1rBYgaseGOLjs-DoP5iLMu5bOD1elcUXsbphfnprjBusAofafDI1R9gB7GKXWJ4-tpecGvvXbzlOd_d8Mh82xQ0ZeXSjeW3nLx50wXtiBGl1fuTdcZ_D17LBWqMYQC6-mxvPl4IReC9qJGC17dmDZWQvKjnCj9hfBJR8tlfXDWg03NB7ozCY49x7YImND2rLuDa142HYKM-SFC0gpe442e0B4qhPdGQDSvICvaheJAfJvcGVt7ycYhNl4KFp3F42AnuHkdsWDQGwjYWCrsTSTE9dpgh_IVNyHPEh7zNLHlz20Ty-NMCBtSIsy9UspzvEV69KMAJFTeCzgP22o7wg5NozgqL-Lp9qLveemXkSWLNny6ssq9Tjnlv_bUxmkhtcj6kxHWlf7g';
  colorClips[2] = 'https://00e9e64bac0ec3a96f5ea9f2dbe67a87dc49532db034a4f0b0-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEsvn3Mxb023p7TdZ1Vo-o90YjB4o4MELoFBfYeBvvfBdftvUNUmBEPtLVDQPPmsRDawfL3V7GZTxbrKej5Az1n0bOwdIgdFkqrcrOKTXa4kJRVx9vtEpAut4bpztbHgb6yIrPPgz-kt397uU80VrufgfwW-CfKhE7bRp6AEpVTlG6gGColqd83hF8fb40UApCS5NZ4Rr05Yd-bu3ebkh269JPDzqpYFYb1IVty9g5Kub4ENPKrMOst9O71LPJE1OAVAPBFcl4l4nzx-8vCREhA3nTsOLEdbb-vThTrY6nJ5c_OOlEh8l6YlIh5HA90kdP1gppoGA8KOztwYYdDB6Gpco2PteSUOMWC1xiFIrfeS2aJTb6VmYXYUlgEb3stJ_GkuQTbSrD7HVABuN5bFz0xWIrhOkoD0d0yeKDyOASAr5rLhdoWeoFQRqwNGaPBnFNc5TRXcJu4oxgw2MP1I2pdp2j6H6C3KxDob31jOMYmUqnQ80XmzNhiPz0VNaN8ZO8fmSRZ_QxS1Isi9xqo7sTwjPH3k8yV0Ayu0039Wc5LTitPltJ3ixKkDPYwIN3cD04_rIfzMOjHOIhWM0cHRgSQWYYVOUmYZQrru_5X-sZh2TphKtiCII9I7klnTYARzu9kscWZBc59jFblsRJaB1ECX9b4-b45V-88k3EqviZh6eZngqGMMfr3RTYR4N5pQEozSmEzYSJXt-XoUN0vYmqEcCZb8E7NWN9iSuXNpUwpKvST07m77NQ-1P3ZaibQxB6MlKjrQwpiSxW-tH_SjTi-FzJRktA';
  colorClips[3] = 'https://00e9e64bac9348681e59a47cc38aafd25495e7f0ed5e647417-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fgreen.mp3?qk=AD5uMEsC2ccAWow0soAcbUm_1qJcxEM4P-OQo7Y10niXzS206jHg6WJTm74vIpO1wScIF8_KnP1vWK3YtjHqjowngqiXa6txsVYSRbtTBGZt77aMfpbNPkx3SXpEpitHQBKqXMl3cCriZE5TI_qM2RomLU8mYqQZ_mPQpdX5TsiSkcfk0Ggc3pldrdookixsf4025du9qAlLiCzrKE364FmqdIGy-D0xh01OYb9SFUmL-IG6sqG4QHEIie49rCIPfudsRVYFPyxiW9cMjo7JZ-Fbx-pjc7ZvalBvGq_tb9QGtR64o5fnPZAPvlL3IsAPAIuhTBborwXV5MJQ1Xmo5TkPtP4N1UH5hiTYBKeiZet_cBSFX4vVI6cbIT8rSxvVjFOM-A5INOzzAhU4g3Hc-bsIdiLU41fU7Htm0UxqFt8ZGAIxJNM0GujwMsIsFsBYgonMXw2pAPViwXi5f6TVi3KAYIcJnwC_ell8TyWMxN9IORVzFdevE_cS4iW9N_s5tCiRHN_gyL_RwxOyAzax1forj44pauMZdOwf9-jJZwL1WKLHyoYtObaW_yDE5vphHpu7ara7qLTcusqhQgaOvGgdex-BkBCfXYSE1DxuKIW7KRbSFCr1InRonbJ97b9eDndOnVnFgAl8kPgNc1Y178WAqk_DeY7VVAzXZ2ZvRQJmP-kpIhQ8CQtFw7YstpJwO837uRzsoMgkoOkULc7Mnw1GZ6BqhHOtwL0FCyIWXd-LyxDlD2OSV9aNJITT-AoI7h8z5bbgwkynwYx6X3C1C3e3pHDVQY-aoQ';
  colorClips[4] = 'https://00e9e64bac6667fed4987c07d3b09f96c0e89e8f5f8e12a0c5-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fred.mp3?qk=AD5uMEsDCKOpVwyfTAkBEjAVuGWLOqn0UMWJQpgldmRGzmEKm-TGDfljsxtFjBqLXE-o1i0TIFOxm5BF1jQY2BUDvvqnr0Yvi39HJwWogWcSEMspfGg2j2qWgTqjbgsk8WUMOMem5u2-lFGais6sTZYxzQ7n8WopnYrI6KaEqNj8RHHULHtpEuklyC0zL16h_Bd5JMtVuhqeSHmDFeARvRj4JGyAOjChY24BXp2AGjV2eHojhEICMcgEhIKkOLD9A_Nz6kDf201ba38DetjssBHFpo6JKEnE38KB49_iutO7cFv-SzrNTfrW1_3M7z9tkjdW1Ze1QbKY7v6gwfL5b-R64mHDnuR5Z1cR_kPokPg28VgkH_GZrjM1lAhsf6Ihtqjz6NUICLuaaSxKmeM4lQKzb3SKkl51axLBixfIp2qOW-6IdW6bbVVVwdY1knCvi_osKOF-BEQ4fWrDFuVMBcnpdocjnVqWdHPHrj1PbPvnfEMoS2oGxsTcEZ44HbSAN_qdbHRFaLwBVm-ZTiBNERugW-zTgdqtWpL-e1ZkcfhRu8ulQaEzKchw2yv1FmqGMFjd4e2aZClBOOvmOFK_Hxswb-kl7C-_KsHbflkuNY6JbDeTZl5rKdRiGbuAUO4MRbsc9u03XGNODkOBaIwRmDAdsXiI-3GyxPiAzZQEXnFepXMVABVQOSdVqdxGJp4DWNrAsmiF_GCLpfQdea_IWmzAzlBa5_gDfDeSyKdOrM57lLP9plDwFX4m4vP-0-jdiOHsKIvAGIfkKzt-XiSwHSS_frfsjPykPg';
  colorClips[5] = 'https://00e9e64bace138dc3536f9da44ec90498df7c10f1fdc3dc8fe-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fyellow.mp3?qk=AD5uMEvHk4sWqibOUbFinFVu6wMwde56gnX_E6HDV1eZT7VaVVxDsWLNC0wIy6NJhhF76S5LcnYiQ8hZDG141647pbZNsH__WystOyhDunWohUfhO7sygkNYfclcCj4-7sMNDrTPpwdT4VgoxyNKxBg4PrUUZfJWIa90iQyMT3AuOBZ51qVYFgBAKnSAmR0MetKpP1M2ahKS0w_nGx2g0wA69fz8ND3-fO0Bk3XZAMcUXVCCzchb7CU3B41vgsmUMtya2XmxCmA1Cg9bcd4wJ-v0vcYbAVapjsdnqoOUgrPd8EayEgJPhYntGQQQ8KeooM2yO2gM5bd4wbbuFtwFAYq4OaUP9VSPT2oeCtNXdTFF5QQREgj0xeE8Y_ZrOrjgiRtXhilIDBLwEneVOB9kt7o_ZETPqRonWgNuPIhve2Q5oTlvOJZJevzGmYy11W2NP98W9VVMTro_6bKyz-uebF-v4mTI02j1bC0_djeqs2C4ie-hzcIVgIiXrvV-d1pJVso2w-KtTOPsYnOHXiM35KgLn6jE2NorpmgXZ6clx7vIbogvU9vSQHyMkdDDBDZuwbgQ8BmTbnP2YlvxVVMfE6HCM__bD7YlvTTQtyLpkWz5uNEPjSNzRyMloBd6rZ-3kt0qqT7jDccHLhyzFupUJDQBoL4oXiGk392CbY2z_Ogzt4IBQCDYjy4iTx5rVPXX9_h9aAErJfBP2RHorRNKFfCijEQEAsatiJGrn-4voa0XEQNsUTApdwmvIgYsG6-hXL3dY5nuVVC6iYRN3EIZMP2qR5ZTA6x9IQ';


  // Create object toggle function.
  if (!didAddListener) {
      window.addEventListener('keypress', function (e) {
      // spacebar 
    if (e.which == 32) {
          if (cubeFace !== 0) audioElement2.play();
          cubeFace = 0;
          currentCell = 4;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[0];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
    }

    // up arrow / 'w' key
    if (e.which == 119) {

      if (currentCell > 2) {
          currentCell -= 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell += 6;
          cubeFace += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 3) {
          currentCell += 6;
          cubeFace += 2;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }
    // down arrow / 's' key
    if (e.which == 115) {

      if (currentCell < 6) {
          currentCell += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell -= 6;
          cubeFace += 2;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 2) {
          currentCell -= 6;
          cubeFace += 3;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }

      // left arrow / 'a' key
    if (e.which == 97) {
         
      if (currentCell !== 0 && currentCell !== 3 && currentCell !== 6) {
          currentCell -= 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
      } else if (cubeFace == 0) {
          currentCell += 2;
          cubeFace += 4;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 4) {
          currentCell += 2;
          cubeFace += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }
    // right arrow / 'd' key
    if (e.which == 100) {
        
      if (currentCell !== 2 && currentCell !== 5 && currentCell !== 8) {
          currentCell += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          cellColor = state.state.charAt(cubeCell);
          cellTone = dictionary[cellColor];
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();  
      } else if (cubeFace == 0) {
          currentCell -= 2;
          cubeFace += 1;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else if (cubeFace == 1) {
          currentCell -= 2;
          cubeFace += 4;
          cubeCell = (cubeFace * 9) + currentCell;
          audioElement.src = colorClips[cellTone];
          source1.setPosition(cellXpos[currentCell], cellYpos[currentCell], cellZpos[currentCell]);
          audioElement.play();
          audioElement2.play();
      } else {
          audioElement.src = outBoundSrc;
          audioElement.play();
      }
    }

    console.log(cubeCell);
    console.log(currentCell);

  }, false);
  didAddListener = true
  }



}