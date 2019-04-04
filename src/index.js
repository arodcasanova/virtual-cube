var cubeFace = 0;
var cubeCell = 4;
var dictionary = { W:0, O:1, B:2, G:3, R:4, Y:5}
var cellColor = state.state.charAt(cubeCell);
var cellTone = dictionary[cellColor];

// Create an AudioContext
let audioContext = null
let source1 = null
let audioElement = null
let bellSoundSrc = 'https://00e9e64bac91327f304bff8679c7acfe236c98ad8799b77f1d-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEtqIyw6taU5wHLrjDqUup0vVva9YnngHEKHxMHZ0gN8EkebgyT4wz5qCDuSBZlSm7XxL2u6hwwin8FJp_t4xlJMb9ksmtMMNjCeZmRL9b0d2jeW90v-k_FbZh1SpUuVsmL1t2gaSm0FB8CWlu2VNKTfJVz-0IerVRiiCJpqpXbtsVmBzVD79cSRMOfQlM-9hOZZZGriPul8UZG8z5Z28LImapVotTtcXCxTJSlEbYuMIheon-i-NC0EXGn_cip8fEENaUOjLNQ_pkYdUCf-XXu9XAA_6Vlfcx_jtCenOizbwUD0L0RpgVQD657A8dq-joFkWtAi6pzdwZBEtArCRWZuBmvIjsIUjnZD6shTkTgfFRH931FADBlWADwdadCm-TzASRvhlL05sFY8D7060jvdlPtCFs2R_hXfYi2LgGOV-nkcSVgCMjPi7Ps4lCoQedM8uzpT52Va4XSMNV5Spdj662HkmoXMbdEgAbiLsocnvOmafDmfI0Wf6CbMO5x9Dp_1W4SmTLHA6KsEj9nFF-F3qYBjbLl3p4Lay_C4YI40Kcrsys7ftJKcum0wDb6TqkLqHGLl0pgwuB-mUDSuC5SYQZj3L6inmVMAucRMYHFxyOeypaOFr59nuwFlaCaSdB6xTkPgL-BtvgSrEN1CKtA3RImutgbfoV3xEimaF3i8BS1QxCaTGXH64ekspo_pAdpzWCatohIm46HQ_-eUXbC2HhDgrz1tCbs3hhXmlUuffc-Cz9HAFukc_oENSI36fdJTX5TcyXL8bu1OEs54uTOsPtR2hQ';
let rotateSoundSrc = 'https://00e9e64bac10ef63af200421bad7caa54cad7f6fe51e4eccaa-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fswish.wav?qk=AD5uMEtjcgk7Q6PDTtEVlPYMqLooYe_DtC0ZUMuYEU9GZUeIj4RfVchl4clXO5Fa383h32rkPbPwwFfKSVUR4CD2ieX507tjueOxaSjT1ZNOvKhtU1Pif3MFVR8RYNUbDqY5tUFGQRkI4hS_UN6gBIO7r95anvZp8_du3cVtP091Czlo2r7LQ7hI9KSRGG3gMIblg5Ld6ODveWbw0vWCsYUx4G8UsmiTUOdf397B-yda_GGnSrB85l5i35qwYX6_CGVdEb3fQGUPcBMRE6qXQwfHhsD9HcYg92ilvy7ZJQRj1lAad9OOXE261FnBYEHxx1oT6IfZgkkCb9DADMIPBP0PXXG1rswKOP6PEZ0tQBTw5qiKaggBn7Ki0aLwuPRqCVLZruVIYhryHBXs7dwCZsjiNsVbCHIg1WTgxYjGW6vxWIfbEueySDSDJGocObZ5duM2KICTQcy6k3bg8R4wfZ1zWaBtZfl155DZfOJFVSVggLwS8xT4FNrgVxl7LwXr3_ax3dUpRkkCqASQ62k1mUJ9kkXt3AZwsvZMOqYXsjh8eHgFT_Q8AkCTpnME0ILcHUDMTeAc68sBQxuhHKdA3Qajoj8EVGPVBl-Axar9hNxc0_QjdS51Hi6GpoJpntZaLFdPw5sgQav4hQpcFeR7gMLWLUtun4wef4_cJQ2iv3ykz_ad06eaTwgmsJ7yrvv061SocVjJNv12cWTZYfRjEUZD0SNhLJsiSYqkadARvr_oT5IgL3ZVVFWf5M88VUlJO9wVx8emLMn1wB6QTRpz81IAeaIKKeqc6w';
let blueSoundSrc = 'https://00e9e64bace4460956d5d217262c3c31e867bd9b07c0ee1467-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEu8Wu-hc2byskmRxYEH9JTXuU5zE9rYVyMEayt6mWudOJyWmVFsP6TmAqwGB19l-MU1eWLbWItJNOJszlE-vb4HliGXK9vQoOLOl4bF047QWzinXi7XNnSMrQU5LantzWNw1pqCrwU0COIZNaK_fpOyQ3WzbNfcSfr1Fb9NVw_8xu4YwPW98rMR0zIVroQ0SbfmYY1qCjZXkjavTtFGZQGU7cA6fJyQlApIc7m2o4MuAeZ6gIbNQe8FlH6cC1jVxRShJ-B0zbFfCfpsBb_2HNNHMcpNGLNE0srwtju0M-PMJWhOZ34Vxmu06kd1KOA2Uvklov-yvhstn82bkQrjhHhu9BdfaLdx63eLOUSXA7Mr71cDr4O96zA9OfVTqwV6ZLOdfSoTvbO1sRuRthebCEvX2mTamIPAOaRtVylSYHXRSh05PZKq_bu_K8n87sk6Wm2HrHZ_sVlLotPCiLBDZIRsRGTMhUkOFOfB8CPf28FRyfoz5LKgIUfCm82UYqsVgfVH3rLDgqPp20oTvfQwH-P5MauEm7BepIeuc8XAAzVIkiIHLjlAtNZogoMw3ooh6Fp9lIwkOG7ObIIVAqPQ9eKXnvq3uiXr8bUtEFSJDEv5iYPwqwjhX3JWqit1Kn04gwvkBXNgAnVySpie8WW8KqOXTgpsmrGSuzmU4FbK8I6bix8eDi_ilQ86NUjuavNjZL3lUaYkA0eETRaWFIY3MRKCzsq028t8RNmIORJ_5aH20e67q2UtmBSLehhWqGaBBxxmpUi0MLM-GjA2PMYTz8rDrFVB_g';
let outBoundSrc = 'https://00e9e64bace5c5a9fde44dbfca75363c216f65f26598dd113a-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Foutofbounds.mp3?qk=AD5uMEsogPGnwQT5cHumWQZY_OyTswT-fVS-nYD6dC0CcusACFSvdLp5gHpXDDkiHHKJHn0N7hHRjOg-pl5XoScmheja2YUk_KCA_F_E4BJFKfXMTP8wQ1ZzkfL0agICaHuw5w3KCHLYhlbEL5TKsmBQo7YUifz0dM_ZAsUw1evy4I1PC4DkNyy_0cWJ0JlwewohJtQIykMUw23rOcH-JAOlMasW9rqkHZK4-GtFSTJaTOSB8dbONgDf0tnsmZR8VteUazjS9WamHXoYPbBtSxfy0zhZastBwMwhqUA8Od9XTrFq23scaqoWejfvlzPgf5o5e4frJrXgk_etjggPtEmRGvwSaOqNkXuHAv2c375vmRA09PrEqSqTQZlOUDnbHe1HASzkjNKHlamxqF0kZS_u-nMHaAwnwN-yH5k4jtleDOHbonOV4vBqA_IrFNuS1YEecSyAaAOkZfRo5WFyXQsd1rCVp1MBnoQl42B4CeeLkyJV3Tlg7VN_ACSV69yBz3AO6-24Wt1PaoLVWOjXUo3cBhlABmDXlZhSd3O_QSO5bjPyBp9c7ZqutEH7QpB94BEwJ2z-gXY2KrE1Ek-0QkwsY1kvb_UNz80iezQctlNkaDcU-ABjy1-BJ_Ejp05wLXAou9NttvmOesl8Yhfz2Hx0K8CJM69zpAHSaM5YxCjNAGV326OA8M58VC0Ut01GpG1c3s7u7nBtxva5G2WuhIcGzXaB2cFWxHWMhMnC6uBZt-jBwfKFwByQfpthn-rORvvBNTKGyAK5qH-TpjYDAVWCkKlsWwZSTg';
let didAddListener = false
console.log(state.state)


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
    source1.setGain(0.95);
    source2.setGain(0.95);

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
  colorClips[0] = 'https://00e9e64bac91327f304bff8679c7acfe236c98ad8799b77f1d-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEtqIyw6taU5wHLrjDqUup0vVva9YnngHEKHxMHZ0gN8EkebgyT4wz5qCDuSBZlSm7XxL2u6hwwin8FJp_t4xlJMb9ksmtMMNjCeZmRL9b0d2jeW90v-k_FbZh1SpUuVsmL1t2gaSm0FB8CWlu2VNKTfJVz-0IerVRiiCJpqpXbtsVmBzVD79cSRMOfQlM-9hOZZZGriPul8UZG8z5Z28LImapVotTtcXCxTJSlEbYuMIheon-i-NC0EXGn_cip8fEENaUOjLNQ_pkYdUCf-XXu9XAA_6Vlfcx_jtCenOizbwUD0L0RpgVQD657A8dq-joFkWtAi6pzdwZBEtArCRWZuBmvIjsIUjnZD6shTkTgfFRH931FADBlWADwdadCm-TzASRvhlL05sFY8D7060jvdlPtCFs2R_hXfYi2LgGOV-nkcSVgCMjPi7Ps4lCoQedM8uzpT52Va4XSMNV5Spdj662HkmoXMbdEgAbiLsocnvOmafDmfI0Wf6CbMO5x9Dp_1W4SmTLHA6KsEj9nFF-F3qYBjbLl3p4Lay_C4YI40Kcrsys7ftJKcum0wDb6TqkLqHGLl0pgwuB-mUDSuC5SYQZj3L6inmVMAucRMYHFxyOeypaOFr59nuwFlaCaSdB6xTkPgL-BtvgSrEN1CKtA3RImutgbfoV3xEimaF3i8BS1QxCaTGXH64ekspo_pAdpzWCatohIm46HQ_-eUXbC2HhDgrz1tCbs3hhXmlUuffc-Cz9HAFukc_oENSI36fdJTX5TcyXL8bu1OEs54uTOsPtR2hQ';
  colorClips[1] = 'https://00e9e64bac1c4052ad5c74f52122b47c3c81c659f8b94238c8-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Forange.mp3?qk=AD5uMEvXvyINPuc2EHF0MaR14f99C9PKw6mpKXunYRJlM-HH1GGB3QngjRcMPXSGooaNnjdcrKwJBHVnu1uowEro9TRtu5ejp27DPBQn34at7c4sdvpiXQU4eb1UAFS491Oj-Eq2w-l4THUJgrAOroeJ4LCFzJ0Zz7lgwSx9J2Ors7R1FOdcaTX5gLDLpmUXKVGVjct4TXpGGgbYHwMW1CudQsoo1UnlmN0VgzmNWzi-tzriO_S1jUIruXpHeEOOYRIUHRB0Z5IJ6sd6L61SlkktE4AHxdFLIYIp7uWpQa62wlxK5xEt4wqJodhn8Oucubue2PI1pELRbId7OI37721jWSx4d-XYe2VjTjCVOv-sT1O5ebIfu4IG6xihjPM6etQcJYPIhWI9WviPv3dV3CcVgYXyNSBu2wpUlAeCDaANS6v_QqQ_IvKDFo22efXmD7vx0amhmGkRSilg0Jq9fOecetdhY9QVNbPreQ5pJZQaFxN04c4RMJP00JhDjAj8yXqFd7wGZHCKC8lQrHjnbzsBZtaRejafurMFXi1eRYcvFIYa6XtaejiD8rDseDLTI7KfgDC5PbKtTLdMFFIA1ewPDwC6CPraWpXMS4vInnfJBgYKv1KQDK5f_hu3NpmnGdwHMqESPd9fmI_LPrZHtrcT3DGTGHbc4cdpzrpaZhobbef21OTRyS4sq6DlsE4gx7SCwg7RO9SIqEIVhz1m63MjugXl5oEMxnsZv17-CILuXQ_R521b2VkZbqtgORuloLd5gdkrerWX8PSmfpof35p5Tysc1qMtXg';
  colorClips[2] = 'https://00e9e64bac22bde3bac415b54c67420811c6abdf688ff66b60-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEvPWb-_63NCui_YFJI9Oivp4mt0L2slp_jEcSO3OFlRlpaMqvbMpsVCX0qNgEw0itO0WnPmWgmGDM5HIdff79pUmYoPq7nYx3mUGEGYCFN4knLsJ_rfmfR4Zq6gR5VcbyvlfLb4OyGhzjyW11nAbovh9vrjAxGl0TVfAe5uHVopT4dJloEfNxOnA66EmVNeyOXJpU4BvAA2RnWnoJxDm7v8G3YKpTxLX916q-7mPG6WF2u4iWWdmAX8eWaDxOMeEkVDMny-0yJWzR5Bgr-JDNX68x4t6m4WkpC1epieYWmiTHrUBsO1jBtmFDrzMsoKk3LIXj3RPkVhFW20Ax3CZj10s5P81iMlfO61SMOSlL5A7sDgSXKZHDVsxQMJW2oCHj8lPWPjAsJiwUzaXc94WItc3Rm1rWo-bFnyhlcdVAfHNKAfETaMACUYeka3Sm53_-f2YQ9sH8Z905LE_R83VCzPqp6satrqDVFVo9f7eNzvFLjcwsJzX2hruhe3ZXECeI2K_8dlxYofbl4hEeOSQ3HJFLWfto227yzGXdIPFgQMP4pmPiyuCg6hO8xi4UYvmImdQAYEDB1pKaVxXfN4lxj8N6L9N2O8453MLwx7BE-u7jy8dqsYHglQtzEyy9kS0Yv8FYZuuT-1OzaMJMu_C03VJv6laeoIl9iLAfr6JN2WXLSSeIgGkPsTmZ4TY6lTK173MZNeyejGytOQ6zKVgKyMi6lOmXOMSeKmqfCKeQ_QDHvzpX279AZp44RHuAPFzPQf4xdV9Xli9cqoqAyV09mVEyAi4A';
  colorClips[3] = 'https://00e9e64bac18fc0be1095d81373a337f2ac2810e83fa2b07da-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fgreen.mp3?qk=AD5uMEtKjr0KA39izOl82IpkxhntBJXcmViTtqeFdO4GAvNj_LSvmb4Ge9-TxH_H2lcq-36O6i6yzyd_fKg_IADbVd1aSrZwdUQEJTTL9xyOQYBD4zoi7C2z8Pv8gcNb3zr2z2ELn8ZlPbj4SgnKV6JvhfFeikJXyCEwN_Nh2--d1H8gc_G_9g5mGwzzvwMhYFQeksCFLyJIySPOYHMkYX1jyGW67oGF9tRU5UFPUZnhyxMzaZwem3GZRBL7Wb7549dmhzMkdwwmzxveMPrREmLDb_wXe9BGmvihBo-uL2ayy19CYlkWC2aYoJ-rZlb0sCKB3mRpkFDqImMpCKDNCWgZz6Vs2o3ows2qiLQPROLl_A3KHW7YCt2um2Bqg43HlOcIEF-oeGs8cNoaGKqYJ6uF6rnVyhrewRblBgdz2rHC_l_iAJwVV8cxlP9BEy03hPRaeOo86zQa3WegrkvxW2Ex2GgRNVsmK1_cO6lsLJZ-SAEN884vSB_PjdWRhdlDJBOaj09QsHorteS7j7JBduXz7hl4sdhSEAPe7EhwYzi8D2TdSJtZqM7gbTRtJRj5Y2JnDnAIPXvU5_4AElR3vAJYJyJ8Lz3fKXD_wKEFD6MenNKRgoFTN8LjIi5Wrpcee3boaqTyRLj8PR4-n0sOCoAohQuHfoQUFG3PajijU8ZjgCNE-oRnrg8WyPCBxX6jB2DyjKFmUojt8yPvm3_jPat89n468hZ8VYe_pxdeWTsRmZAT8ATCJQ278b9q_HdrgR4EgzCUhG3CxKkI9CeDqkjPW229gKlzHw';
  colorClips[4] = 'https://00e9e64bac1a1c07491cbe698bcef14abdfd9d19a7c550841e-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fred.mp3?qk=AD5uMEvVyA0Q8bKYrXCaulC8y_LiI4oapcENbzOfn5LdC21nxlPEAEJTl2-iZ1nwfn18Yrlx3AQbfrTwE4TfaUG7R1BvbCpfrDaJxUjfV3_oPSVpyZaZVSxg2Fh_YyXa-QwlSJbO_k9PSRDINsTIsODjLc-mf4538eaJLEXE414NEnx0nQ6xYaYioqAxAY8IfY31zyE9XGz0r07pNp9H9wAh8LzqVfy3zsp0Q4Wk4LlpCk-WH7BKfmform9d9DAAUEL5crGMvopLs8SthPNV_ZoXyIQqUDLiIBqzkWIbetX_FrxE8gd4mmcEBvx5P2TX6Ol4kpObPF3Yd8bH9JB86UiOTAj7yCjLj1R6hjiBzvGqrNPJ219srzvwFysF-C7h5N4Elj1IParl7Ik4f2iL5a2wXFAkm9Cfcsaz_WC61rR6GhMQIG1Ng7KzV9sQ48rlok4NFkG8oByFY4Nc3e_GiMurahZ9U47L-M6gi7scBEmDH39eI3Il1ipyyaNathhSVRhQK1t7Gonf9RT5MGcI2JDdNQDbfEmvHAV2lOmmdvBZhi-0TBO-pga81N9CdlRQ_nYQr4Hd91gaMEVjT2J-mAWcGspSrdr0MW3FCl0oJj6_uc3BiC_O74OMAEhTfCbl7y10uPjMThkAe1fXVSH626MtOAyeislg8OhbxgXiWDMBKmGeRz4Sq0TfcHc8Yy289jsmE8q7HwZPLRQoTXISz7W0mqx0iOPmP6ZiBoa9gwq4ynEEEXT__8x-k2vctk816EdqCx3ECSgPCmhLwtEqBp4r0MbYlliN9w';
  colorClips[5] = 'https://00e9e64bac946ace0134d05e8bc1a39d7ea441a2f29a3b98ad-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fyellow.mp3?qk=AD5uMEtk-B3ZbEK7hULwOm9FRtS4rNNpoUnsy9MoXObvTCgKO6Tjc-HftUJLoLZkPNiDZjuAVg5eURnGcyRwmxbABo8ppUA-zqwHRTQETbpXVr1XEdKrmg3BSpyOqD5mSU8lOhIsvtD2e3r9dQPqWKZ1wg0cGUq8YRLZ-hMUv-lyK8up2qK2EKCIw_r8NiPY2o2Ckcuvy6BM6zVu6GRzy7x-Lwm21h7Rtq_ramY6AchBSugvZQE4TA63GrRZv3fwDtntMBasneBdvnsbn17PljogLIRtTQneOkPiLKma8oXThQnv1JITpvm1rigNws0LIVzeRig6yIa5Wj9cBohP6PMDgicdN0i7T59LYzv43G8vsIV_icAsFRAIrJ3JKSHFR9ueGJA1z3rd6mKZeh7hMhT2ls3sZVC-CVfUGrOwq1wbgc5qcaqIwFULxrKQ4EQXiqC-2zP6c5FVBh97fvmsYQxJFJTukDae6fwNoSFVbcWCFiAm_V3G1uBqpimUj0kzwgOGw2toncLBt6z83ZBImTbEMjiqPQcF-8Kj9Cxhqbi9AtmRqjZUaz4Ex6IkkXJsTY9CdwxPLytT5Gzrgbldw6tQE-4r-XHFAdfQ6jzFm2u1X8dtx7JVWVLIwQlidZUBcZVNV7U0Irte2cJ7GC56NnsvHn-9g-qpL6eK4lCUKfcixbd9PsHfzwKKvAttfhpu5l87UERsONwK2IOxaKSqZ2JsDH7fkbMDSA1JnOtg7j0EP2KyRHoBcvudxmiBwyqaXv0r0pB-F1153_OFWFec_CzQ6fe_jIyr3w';


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

    if (e.which == 99) {
        audioElement.play();
    }

    console.log(cubeCell);
    console.log(currentCell);
    console.log(e.which);

  }, false);
  didAddListener = true
  }



}