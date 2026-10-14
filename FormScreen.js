import { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';

// ─── Constants ─────────────────────────────────────────────────────────────────

const COLORS = [
  '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F',
  '#00FF00', '#00FA9A', '#00CED1', '#1E90FF', '#0000FF',
  '#8A2BE2', '#FF1493', '#FF69B4', '#A0522D', '#808080',
  '#000000', '#FFFFFF', '#C0C0C0', '#FFB6C1', '#20B2AA',
];

const GENDERS    = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const COUNTRIES  = ['Kenya', 'Uganda', 'Tanzania', 'USA', 'UK', 'India', 'Other'];
const INTERESTS  = ['Sports', 'Music', 'Tech', 'Travel', 'Food', 'Art'];
const EDUCATION  = ['High School', 'Diploma', "Bachelor's", "Master's", 'PhD'];

// ─── Color Picker ──────────────────────────────────────────────────────────────

function ColorPicker({ selectedColor, onColorChange }) {
  // Decide label text colour based on background lightness
  const lightColors = ['#FFFFFF', '#FFD700', '#ADFF2F', '#C0C0C0', '#FFB6C1'];
  const textColor   = lightColors.includes(selectedColor) ? '#222' : '#fff';

  return (
    <View>
      <View style={styles.colorGrid}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorSwatch,
              { backgroundColor: color },
              selectedColor === color && styles.colorSwatchSelected,
            ]}
            onPress={() => onColorChange(color)}
            accessibilityLabel={`Select color ${color}`}
            accessibilityRole="button"
          />
        ))}
      </View>

      {/* Live preview */}
      <View style={[styles.colorPreview, { backgroundColor: selectedColor }]}>
        <Text style={[styles.colorPreviewText, { color: textColor }]}>
          Selected: {selectedColor}
        </Text>
      </View>
    </View>
  );
}

// ─── Reusable small components ─────────────────────────────────────────────────

function SectionCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function FieldLabel({ text }) {
  return <Text style={styles.fieldLabel}>{text}</Text>;
}

function SwitchRow({ label, value, onChange }) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#ccc', true: '#1E90FF' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );
}

// ─── Main FormScreen ───────────────────────────────────────────────────────────

export default function FormScreen() {
  // ── Text inputs ──
  const [fullName,  setFullName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [phone,     setPhone]     = useState('');
  const [password,  setPassword]  = useState('');
  const [age,       setAge]       = useState('');
  const [website,   setWebsite]   = useState('');
  const [bio,       setBio]       = useState('');

  // ── Single-select ──
  const [gender,    setGender]    = useState('');
  const [country,   setCountry]   = useState('');
  const [education, setEducation] = useState('');

  // ── Multi-select (checkboxes) ──
  const [interests, setInterests] = useState([]);

  // ── Switches ──
  const [notifications, setNotifications] = useState(false);
  const [newsletter,    setNewsletter]    = useState(false);
  const [darkMode,      setDarkMode]      = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ── Slider ──
  const [rating, setRating] = useState(5);

  // ── Color picker ──
  const [favoriteColor, setFavoriteColor] = useState('#1E90FF');

  // ── Helpers ──
  const toggleInterest = (item) =>
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const isValid = fullName.trim().length > 0 && email.includes('@');

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const formData = {
      // Text fields
      fullName,
      email,
      phone,
      password,           // ← real value in console
      age,
      website,
      bio,
      // Selections
      gender,
      country,
      education,
      // Multi-select
      interests,
      // Toggles
      notifications,
      newsletter,
      darkMode,
      termsAccepted,
      // Slider
      rating: Math.round(rating),
      // Color
      favoriteColor,
    };

    console.log('╔══════════════════════════════════════╗');
    console.log('║           FORM SUBMITTED             ║');
    console.log('╚══════════════════════════════════════╝');
    console.log(JSON.stringify(formData, null, 2));
    console.log('════════════════════════════════════════');

    Alert.alert(
      'Submitted!',
      'All form details have been printed to the console.',
      [{ text: 'OK' }]
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full Form Demo</Text>
        <Text style={styles.headerSub}>All elements — submit to log to console</Text>
      </View>

      {/* ── 1. PERSONAL INFO ── */}
      <SectionCard title="Personal Info">

        <FieldLabel text="Full Name *" />
        <TextInput
          style={styles.input}
          placeholder="e.g. Jane Doe"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <FieldLabel text="Email Address *" />
        <TextInput
          style={styles.input}
          placeholder="jane@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
        />

        <FieldLabel text="Phone Number" />
        <TextInput
          style={styles.input}
          placeholder="+254 700 000 000"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          returnKeyType="next"
        />

        <FieldLabel text="Age" />
        <TextInput
          style={styles.input}
          placeholder="e.g. 25"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={3}
          returnKeyType="next"
        />

        <FieldLabel text="Password" />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="next"
        />

        <FieldLabel text="Website / URL" />
        <TextInput
          style={styles.input}
          placeholder="https://yoursite.com"
          value={website}
          onChangeText={setWebsite}
          keyboardType="url"
          autoCapitalize="none"
          returnKeyType="next"
        />

        <FieldLabel text="Bio (multiline)" />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Tell us about yourself…"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </SectionCard>

      {/* ── 2. GENDER — Radio buttons ── */}
      <SectionCard title="Gender">
        {GENDERS.map((g) => (
          <TouchableOpacity
            key={g}
            style={styles.radioRow}
            onPress={() => setGender(g)}
            accessibilityRole="radio"
            accessibilityState={{ checked: gender === g }}
          >
            <View style={[styles.radioOuter, gender === g && styles.radioOuterSelected]}>
              {gender === g && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionLabel}>{g}</Text>
          </TouchableOpacity>
        ))}
      </SectionCard>

      {/* ── 3. COUNTRY — Pill / chip selector ── */}
      <SectionCard title="Country">
        <View style={styles.pillWrap}>
          {COUNTRIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.pill, country === c && styles.pillSelected]}
              onPress={() => setCountry(c)}
            >
              <Text style={[styles.pillText, country === c && styles.pillTextSelected]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      {/* ── 4. EDUCATION — Radio buttons ── */}
      <SectionCard title="Education Level">
        {EDUCATION.map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.radioRow}
            onPress={() => setEducation(level)}
            accessibilityRole="radio"
            accessibilityState={{ checked: education === level }}
          >
            <View style={[styles.radioOuter, education === level && styles.radioOuterSelected]}>
              {education === level && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionLabel}>{level}</Text>
          </TouchableOpacity>
        ))}
      </SectionCard>

      {/* ── 5. INTERESTS — Checkboxes (multi-select) ── */}
      <SectionCard title="Interests (select all that apply)">
        {INTERESTS.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.checkRow}
            onPress={() => toggleInterest(item)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: interests.includes(item) }}
          >
            <View style={[styles.checkbox, interests.includes(item) && styles.checkboxChecked]}>
              {interests.includes(item) && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.optionLabel}>{item}</Text>
          </TouchableOpacity>
        ))}
      </SectionCard>

      {/* ── 6. RATING — Slider ── */}
      <SectionCard title={`Satisfaction Rating: ${Math.round(rating)} / 10`}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={rating}
          onValueChange={setRating}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#dde2ec"
          thumbTintColor="#1E90FF"
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderEndLabel}>1</Text>
          <Text style={styles.sliderEndLabel}>10</Text>
        </View>
      </SectionCard>

      {/* ── 7. PREFERENCES — Switches ── */}
      <SectionCard title="Preferences">
        <SwitchRow label="Push Notifications" value={notifications} onChange={setNotifications} />
        <SwitchRow label="Subscribe to Newsletter" value={newsletter}     onChange={setNewsletter} />
        <SwitchRow label="Enable Dark Mode"         value={darkMode}       onChange={setDarkMode} />
        <SwitchRow label="Accept Terms & Conditions" value={termsAccepted} onChange={setTermsAccepted} />
      </SectionCard>

      {/* ── 8. COLOR PICKER ── */}
      <SectionCard title="Favourite Color">
        <ColorPicker selectedColor={favoriteColor} onColorChange={setFavoriteColor} />
      </SectionCard>

      {/* ── SUBMIT ── */}
      <TouchableOpacity
        style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!isValid}
        accessibilityRole="button"
        accessibilityLabel="Submit form"
      >
        <Text style={styles.submitBtnText}>Submit Form</Text>
      </TouchableOpacity>

      {!isValid && (
        <Text style={styles.hint}>* Full name and a valid email are required to submit</Text>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 44 : 64,
    paddingBottom: 24,
  },

  // Header
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1a1a2e' },
  headerSub:   { fontSize: 13, color: '#666', marginTop: 4 },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 14,
  },

  // Inputs
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#dde2ec',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a2e',
    backgroundColor: '#FAFBFD',
  },
  textarea: {
    height: 90,
    paddingTop: 10,
  },

  // Radio
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterSelected: { borderColor: '#1E90FF' },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#1E90FF',
  },
  optionLabel: { fontSize: 14, color: '#333' },

  // Pills
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#dde2ec',
    backgroundColor: '#f5f7fa',
  },
  pillSelected:     { backgroundColor: '#1E90FF', borderColor: '#1E90FF' },
  pillText:         { fontSize: 13, color: '#555', fontWeight: '500' },
  pillTextSelected: { color: '#fff', fontWeight: '700' },

  // Checkbox
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: { backgroundColor: '#1E90FF', borderColor: '#1E90FF' },
  checkmark:       { color: '#fff', fontSize: 13, fontWeight: '800' },

  // Slider
  slider: { width: '100%', height: 40 },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  sliderEndLabel: { fontSize: 12, color: '#888' },

  // Switch
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  switchLabel: { fontSize: 14, color: '#333', flex: 1, paddingRight: 8 },

  // Color picker
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  colorSwatch: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSwatchSelected: {
    borderColor: '#333',
    transform: [{ scale: 1.2 }],
  },
  colorPreview: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreviewText: { fontWeight: '700', fontSize: 13 },

  // Submit
  submitBtn: {
    backgroundColor: '#1E90FF',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnDisabled: {
    backgroundColor: '#a8c8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  hint: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 8,
  },
});
