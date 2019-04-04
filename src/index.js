var cubeFace = 0;
var cubeCell = 4;
var dictionary = { W:0, O:1, B:2, G:3, R:4, Y:5}
var cellColor = state.state.charAt(cubeCell);
var cellTone = dictionary[cellColor];

// Create an AudioContext
let audioContext = null
let source1 = null
let audioElement = null
let bellSoundSrc = 'https://00e9e64bace587f00bd128e3df70445a537287c8e9838991f5-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEsbjOD-y_R99csYHqmffD7S9gMejYRMgR5nNZvNdlBo1tmdcqywer5JHefe9kKfSHsqHogmqHe7FfYjKV3K4xjwyBHXILO2XspNDr627FkrJi1ZOPAv_5Zh9MCmJVkEhO1NLbi90jfnVXAiDlc927CuBIK2PEmVZhLcoLL9lXm0Yh0Q9tAeM-_3dlB6YXLHm1ZeVj2EbbpfGBHZvECXYBhMb6I0fMq1fFI20v8aYucHRbjkivi4FLKR0TiRudgu1ygMKFpI1Pju7YjS9vej84Bir1cvjOkC5wwXgLS4CWWlYYnyjAJ6DzY6He0M63xtBsrIdGLA29r_0gMiBuZxK3g1qn17e-wzEYRW2k_LmNvpv2CvEysb3MVLfem97MOBdKB8hnetGrW2b9EhdVgjn2slT9PsLZ8EMeOcFCi17hXKQhK7dfU_7b19Xi7TGUtQLH3zYpFcrA8vxQLoCxHEKIVx1xyVFhCVHZaR-6R1Idb3s7zLB7hI8cj5JTcYflwbz_N5YkHFOuJAUP8Ct8hX2rM8ERJqQCpF-yabCKrzNeh1Vl-e5LQqHhPw1ySK1cFY6dPQ9EcPGzNVMAQYT7AQHLtwbqTC_hVDnXDd4qJBUnqLvE40L9BUO8RhZneSRyLcJgf_eb9vmCcXxntcvRMaGv0ZEFxZoBPTW3gR1N-Bhpq5aoYEHJYR57T7VsV_P6GEEEZaK0-AsS4g_qqHPLhgtgf_suysFkb8w60FbAAElqRYVoyJ_R5W0LnKDY7X9TiZVdlDNNen6yNxR0RjmigjFQEuxM5cww';
let rotateSoundSrc = 'https://00e9e64baca728f575ded75cdf7fef07166ad4e0901a0e3f47-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fswish.wav?qk=AD5uMEvq0olrnuZ8gob2Yci-E39ispp-rSCOPmgmIym7cYFoFgx65zRO3HB-U7w-SFJnhXzaKZ64BsvVvZe70TPWasNjWrKhTz9Y2grOIISlz8Ipd3K7yl-kHvYjgbNqeg-v4UT7WkQgGshtVPrnpLvl7XbWNuqWDEhiAGk3KxHeU1x7cwB-l6BvrSK5TSe9osm9alyyBx86qrwYGXZo0WvoXdlpfJgLd0hcdVocwC-esqBY5nY7boeFBWQE8v3I_ES8cVewnrXuKwvbncWB0d8NKVZPGd9Kf6--jadyXKNifNyiWZdpjbG04Prn2KgEvZcPPhjpg6vtMLd2LIW6UnCPoh-Nv0sOF7ZcbsxcCvIWjGZqg_hfQhYAHag7NWcQiFxInMIu9dKc6YM6dyBQk5Jl64djp_4qp8WfsxI-nAUpLjfts2o4HrsBZbx5SOBU1cQzgILu7mxAHZ0xJNMWcdp20SvUaflf-ArgV6i4WiBRwvTRHI3vawLgv6KH1TPj3BAUtDu-0dnzQxXXR9uCc2qakvsvsqlfmuCcHVOhG0g4cvIOT_o3gdv0N1KdFpKGZ5gGbNpP_E1TsFUQK-SNT14EmJyUiJaZTAB9xk06cHVkXECJYfTai_6OyiQ3OD8KhpSkLmgv-SbQ0XChkniMFOqpHmTaoK6O6i-YpAJcsYcBfQ4ldaPWhqozsccJcs-D0bKHT87S0lY2jD-sZ8f4sa6pnDxNvL8PrfaVBfEimtIwlxu1zdbIvTXZqwFdFBTv_oAuun-Y_eVmLEp7w1HLkVk8bZac4pwKdA';
let blueSoundSrc = 'https://00e9e64bace4460956d5d217262c3c31e867bd9b07c0ee1467-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEu8Wu-hc2byskmRxYEH9JTXuU5zE9rYVyMEayt6mWudOJyWmVFsP6TmAqwGB19l-MU1eWLbWItJNOJszlE-vb4HliGXK9vQoOLOl4bF047QWzinXi7XNnSMrQU5LantzWNw1pqCrwU0COIZNaK_fpOyQ3WzbNfcSfr1Fb9NVw_8xu4YwPW98rMR0zIVroQ0SbfmYY1qCjZXkjavTtFGZQGU7cA6fJyQlApIc7m2o4MuAeZ6gIbNQe8FlH6cC1jVxRShJ-B0zbFfCfpsBb_2HNNHMcpNGLNE0srwtju0M-PMJWhOZ34Vxmu06kd1KOA2Uvklov-yvhstn82bkQrjhHhu9BdfaLdx63eLOUSXA7Mr71cDr4O96zA9OfVTqwV6ZLOdfSoTvbO1sRuRthebCEvX2mTamIPAOaRtVylSYHXRSh05PZKq_bu_K8n87sk6Wm2HrHZ_sVlLotPCiLBDZIRsRGTMhUkOFOfB8CPf28FRyfoz5LKgIUfCm82UYqsVgfVH3rLDgqPp20oTvfQwH-P5MauEm7BepIeuc8XAAzVIkiIHLjlAtNZogoMw3ooh6Fp9lIwkOG7ObIIVAqPQ9eKXnvq3uiXr8bUtEFSJDEv5iYPwqwjhX3JWqit1Kn04gwvkBXNgAnVySpie8WW8KqOXTgpsmrGSuzmU4FbK8I6bix8eDi_ilQ86NUjuavNjZL3lUaYkA0eETRaWFIY3MRKCzsq028t8RNmIORJ_5aH20e67q2UtmBSLehhWqGaBBxxmpUi0MLM-GjA2PMYTz8rDrFVB_g';
let outBoundSrc = 'https://00e9e64bacf23010c58dbb8b01a3e81a803a2380f2fa0b7ac8-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Foutofbounds.mp3?qk=AD5uMEupxea18HFZM1spcL0p-jsicJ74ZKgJRG4gOYYf0NyX1u-Kel8EW8lr7RBT4QIH5iCyoM-9yYagqIDRntfoj-6_LpnrUtpKz5zRUi5LXtPE9EW8pWvnslBlcASuEsDcHCom5O3YTrQu7x_3-KKE4Nwp7X32OJg8fSYR2f2FEZc2u3aVjbMmYaBSwSHqs6X7gvmgJF6ifrM28iIGVETeSdsoZxZkeAsnMpv9ZTLk1K5pMGNrVa6Y0utEErDdBnSzsQnk0HkvO3fjlSrkLDfj4AF_RvQhSd95JAHgsesB2tyxibgSpOY82usLX741xrYrYEA2kx82I3LpBRf6Tr6gAQI6UO_AiQmsrYwC5lK19V39H7Slu0-Eb99giNejUN_iCWOOmBlPrwIA3GayNrsRf62GbWs-k3FfCQ-mivUFetCpUKlC4ZiooefKoO3LgqBSgo7rD4YzF4Nph1k-XrdSiBEn1CJqLFOrS4wE4hvF9wWgYLtHCTOtsZEZtGrI7-tJ6Qzhs_Q9E_ko9YKWrr0WTGsPdDmfmmXC0kB-qAGreJLqVkwvYdGZ2Jir6J1DdWjrB618EmY9tw55V48OROeqyRiL9odgVkC8LFpd_aFOTaiJBux-QRN2f9_sqopIUJ4JVtyPbpWZVC-ClR0o86P8Zf6zz4oAs_zECtXrEqKUj_pAiQUjz8l3DlCXmoArq_PLLHpTItB1HuRL3s0hSY8dWAtwfQymew1UG__R77wVT2G3ueSonBZwnd9wV6gTkPUFJS2fS1lCEL0ewGE1fHLE8P0rPNgrgQ';
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
  colorClips[0] = 'https://00e9e64bace587f00bd128e3df70445a537287c8e9838991f5-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fwhite.mp3?qk=AD5uMEsbjOD-y_R99csYHqmffD7S9gMejYRMgR5nNZvNdlBo1tmdcqywer5JHefe9kKfSHsqHogmqHe7FfYjKV3K4xjwyBHXILO2XspNDr627FkrJi1ZOPAv_5Zh9MCmJVkEhO1NLbi90jfnVXAiDlc927CuBIK2PEmVZhLcoLL9lXm0Yh0Q9tAeM-_3dlB6YXLHm1ZeVj2EbbpfGBHZvECXYBhMb6I0fMq1fFI20v8aYucHRbjkivi4FLKR0TiRudgu1ygMKFpI1Pju7YjS9vej84Bir1cvjOkC5wwXgLS4CWWlYYnyjAJ6DzY6He0M63xtBsrIdGLA29r_0gMiBuZxK3g1qn17e-wzEYRW2k_LmNvpv2CvEysb3MVLfem97MOBdKB8hnetGrW2b9EhdVgjn2slT9PsLZ8EMeOcFCi17hXKQhK7dfU_7b19Xi7TGUtQLH3zYpFcrA8vxQLoCxHEKIVx1xyVFhCVHZaR-6R1Idb3s7zLB7hI8cj5JTcYflwbz_N5YkHFOuJAUP8Ct8hX2rM8ERJqQCpF-yabCKrzNeh1Vl-e5LQqHhPw1ySK1cFY6dPQ9EcPGzNVMAQYT7AQHLtwbqTC_hVDnXDd4qJBUnqLvE40L9BUO8RhZneSRyLcJgf_eb9vmCcXxntcvRMaGv0ZEFxZoBPTW3gR1N-Bhpq5aoYEHJYR57T7VsV_P6GEEEZaK0-AsS4g_qqHPLhgtgf_suysFkb8w60FbAAElqRYVoyJ_R5W0LnKDY7X9TiZVdlDNNen6yNxR0RjmigjFQEuxM5cww';
  colorClips[1] = 'https://00e9e64bac161083a101f5113118b6bc539b3c8cfeb1a6e23f-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Forange.mp3?qk=AD5uMEtLo6IHSQ1DkjDy9WQBnghIGyb2xOs4MN5RGHJkvY0jbBf9kmsbQnjmvCqmTkIB9m90qRRG701U6waCDYtEEcxZWxHIrdYg0WsonyyBrL60hweHmbG35ZzsKyr4WKV9IUXFYc9o0iYP7AS-iEm0iLjo5z8PUV1PRpVEYRpKf_IiMYw3galDqtmBKEBUIbqbt-aaMROq9H5Opbx3Ct-Za-5kRZpNdO6sWaTs6eV5jsvSUPesAVZzgi0ozsDJB8mznOm6qxHtiIP1ebyNvu4ly0WPq4XNDuIWEj5vjMzbyl_-SihfjVADtWJbHZyQohMkIZLJwos0zfRmj6DaWxt1spbLIWrZdrHsQQ4uGs4OfDbIlK5q8ZVrBYQ_94j0KrwbkL_YST0GZMUCk4wAnE0J2CrZnxDA6Q8x37-D3-BpIiQN2zrNtKuiyVCzbOBkshk6nOcL1Ey3-4f1uG6C78146ZkYAuhPv41i9ZRt0BFwirfWvAQu74TYC5Fa1HzsAtHkMDK9aMYCXUmL43EEFYDMX_9f-sJNHAfaZIL7UX1nAFu5JpCHzef_l2a7z52pzUXPNxe48cLr3HPqdDlg_lRKu_ZqTHMC370AGk0YOJxzZClIqtuAFDSdoD03RlLcVf4BOwg_kydwBLvs-rSCzSl-QheTmP-zPKHAvv8WCz1zBW8qFOajJtnzEFZ3fCXo5Ja-o2fDDSonuLCT-kWB7n9Vl6TeLMc42ihUvS5paSLaxnk6zYe2QRmj8Fjp8_L4yITZxiFrjQFgvcsoke9hkB9g3GjTiOEtkA';
  colorClips[2] = 'https://00e9e64bace4460956d5d217262c3c31e867bd9b07c0ee1467-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fblue.mp3?qk=AD5uMEu8Wu-hc2byskmRxYEH9JTXuU5zE9rYVyMEayt6mWudOJyWmVFsP6TmAqwGB19l-MU1eWLbWItJNOJszlE-vb4HliGXK9vQoOLOl4bF047QWzinXi7XNnSMrQU5LantzWNw1pqCrwU0COIZNaK_fpOyQ3WzbNfcSfr1Fb9NVw_8xu4YwPW98rMR0zIVroQ0SbfmYY1qCjZXkjavTtFGZQGU7cA6fJyQlApIc7m2o4MuAeZ6gIbNQe8FlH6cC1jVxRShJ-B0zbFfCfpsBb_2HNNHMcpNGLNE0srwtju0M-PMJWhOZ34Vxmu06kd1KOA2Uvklov-yvhstn82bkQrjhHhu9BdfaLdx63eLOUSXA7Mr71cDr4O96zA9OfVTqwV6ZLOdfSoTvbO1sRuRthebCEvX2mTamIPAOaRtVylSYHXRSh05PZKq_bu_K8n87sk6Wm2HrHZ_sVlLotPCiLBDZIRsRGTMhUkOFOfB8CPf28FRyfoz5LKgIUfCm82UYqsVgfVH3rLDgqPp20oTvfQwH-P5MauEm7BepIeuc8XAAzVIkiIHLjlAtNZogoMw3ooh6Fp9lIwkOG7ObIIVAqPQ9eKXnvq3uiXr8bUtEFSJDEv5iYPwqwjhX3JWqit1Kn04gwvkBXNgAnVySpie8WW8KqOXTgpsmrGSuzmU4FbK8I6bix8eDi_ilQ86NUjuavNjZL3lUaYkA0eETRaWFIY3MRKCzsq028t8RNmIORJ_5aH20e67q2UtmBSLehhWqGaBBxxmpUi0MLM-GjA2PMYTz8rDrFVB_g';
  colorClips[3] = 'https://00e9e64bac5435b79cfaef3563145c736bac91c63b6dea2e01-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fgreen.mp3?qk=AD5uMEvHl5ci_iOGwmccmCL262OqwoVUNXEL89xe7IGpfQFE_k7TgXToW37bWZ5f7bqK00wY9KmZIocYDDSKT3C8xUWm0lUUPKtL3FSW5iFnPT8gpUUbTva4vyr6gNh4PiADuE8DRF90yKy5PDSO5maioxlmvTV5Lhn0pWpPFe5i2sAJuo3Tv3hNqqrsSCA68_jcrl7gp-Te4qmH16zwYa9mEzpGO4jNTp2jFE0emmw1atA69HF_0yEFTc31YtkMGa_c3LmjQbwyuDqzsTJhiC67mRVYKpglrMb7EjSF6AAx4mL267ydbdmarDVDom5UGnhjMOH13mztbvITmXK9Gf_mOVN6mqHuBPRf9SSWhJ6IE5Sd6j2LtjwpN75qvVF1HHp5TQul-8X_I8C5LMmUczwR_qpul27TE_Se3OR4C_NOM-mOW_ar96FC1b4w_tTvWeXiX4P8jAhGvUTz4qtewtPtsruqPBntYN-TLHpgwjlIcJYWmB3yc_I73zeD0xtxOqUeetJMSiWnQ1O4EQ03bCx3wvTcPmpcqRgRcpSW255645X7ivhjdKug80fddXPjgVYmHpmK_5R4FNCkZDY92cITnkJivCaSB4f5uXRFgsqF4co7jBZkULB1MGdrh4MUi79rBR0vHN6Ye4crbhciYIEWOKv0CbMYrJ87OvI-_NG0Se8eCcml3E_6S22x7zLB2K5NyokFOFHThTIGoqPJgyOx1UVdmj72802z3kgFn91-T3Vaesyy5N21gTLm8r-mNaGxrtvpk5mYZWd-R4juQswzB8Wu3b1V2A';
  colorClips[4] = 'https://00e9e64bac28ecfc2fe93a529bb2f05bfbfed1893c05c63d63-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fred.mp3?qk=AD5uMEvZbpVRPu5fbw-urT2VghKnrif3MYUIn0D_z1Zh6q0g3c_FUhbgW98OQwfBHE2iqYtOY_1FsoXEYohhKgAp3jTIw4fAi3s0QTUt6wQBbahVWWIZ-2ooL7EyUoJKN0jKz3uKjD6TlOx8Cp4GpMBzbaETIet5XqfofZXivNzohV33GAghW1n3sypaDVTmk3qMeiYXLxWoilpSiaJwjX4n4ecQqYGui94uGDINW50WaYGcjn6gGrPYODqtyxMlnQo3WvvKkWZWFPvyqtJQSZyZYv-L4r_1CqmTD72Zbu1xm9xtgPijV4VQEmq-uPM_F5sRM_gCGEvZWp19q0DPKMKzgOjhYroIJ_YT6HqUN5x9vfT1PkDMjGPGk6xKTcDnA9h9ZsJ9QHvKpzr37hR86tluG62vFlKCg5vdi2YbzvnAVgmiUYiAyV146l49mDwZ4LVBKuorRZ-eMAJt68AkCcVbl8fUeQvpvD8_aCLhZQSMfwzV5V-_uy0wqusTcTVi3yF0_9c9-OGFw2_rnHqztI0AWRzO3NWJVFge7LQ_s95sSQSEUMBnv3oHXs-cgLRzVgFSiszdghYj9J97XAldKIsCPW2ccezab-fbO6BntcLROJX34YCgGZh_O5j8DfK3LfXc_1J17YXcm5oYm1KcsL4ZY1OkjZh1Umjtd0WQZjX2iec8cFuAoWU2sCW-Hd00hV03DhxA0CO6GridZTSZKrJS8Eev6a3yEPH3-J_rUpxVMABgeEI3pHfVJHuwZ21ODNhowv71s_NXIlHWQNh1H-5vtB3ClnDk_w';
  colorClips[5] = 'https://00e9e64bacbf4448ab102387ab4ec3213aff05f924df6ac6b4-apidata.googleusercontent.com/download/storage/v1/b/gtclass/o/rubikSounds%2Fyellow.mp3?qk=AD5uMEuiGm72ao_H30utnbxYmJYjkK1srgjc7y7glLiM7LELuGBW5US-Tu5_a4hWi5SnNPzG10d18xiOM9QV3RPUM4Syo_-tnIkikWl9ZEQK6ekk8I-aiw6XN6gQxpLx_793Ulxi14TFUZ7NqCry7Sw0qpxnllwcPsIJKkuwEF705a7QqwX8GxTBDhfPTcxiwBIlHqggEQk7fGxyRyy04YYB2ahn9D5b0B96MKt1mtTtLbR4qOE7qz3VD3kn1zAWqKPSs-dKuWCvU-uXAle112AVtNMo4pLtr98Sd4mLuehLw_Kon8vMtRdmdo8B6V7pGheYZ1ZZbnabNalPj21aeOI717NEbxQwPqFd1ZVwtg0OrJdMbxckRnpADWygPAn1XhjAhJNd2AxsjhMtyNeaesovoNz0ikjGI9vQB675gA1X_rGxNHjNDIc4UI4Cv0TKAUabPyxX01ChpLGrw6OGNpTE7vklgKwqpjSwrYuCiPFBTP5JeO3J12spMvo40OXkmwbbiGuJk8a912g38gtJ7e61qbZB__gXrEBDhoHLqpWaiMcGnACmeUBY4yDQMHSXswuQPWGekHSKvueGRF2Tfiai4kd8CZjv9dVd30bZOv9crN_2NXkmStYjwvRGG-B61drvdxPOS1j3nF4Ek7P4dZHLeShfV9kXqP46j56uN94E-gC2KMLpvNwW1Il7bc3fZ-UNo0b0Nnj83vVS0a3B-mvVqCPLok8nznn1Ex1TdFNdsZcw4W0TePL2HYloNVT5uV8KHD7cK2VQr8VFPmorc5x79Yvlt8Rm1Q';


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