import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Typo from '../../components/Typo'
import { spacingY, spacingX } from '../../constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '../../components/BackButton'
import { colors } from '@/constants/theme'
import Input from '../../components/Input'
import { At, Lock, User, WarningCircle, X } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import Button from '../../components/Button'
import { useAuth } from '@/contexts/authContext'

const Register = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const confirmPasswordRef = useRef('')
  const nameRef = useRef('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const router = useRouter()

  const { register: registerUser } = useAuth()

  const showModal = (message: string) => {
    setModalMessage(message)
    setModalVisible(true)
  }

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !confirmPasswordRef.current || !nameRef.current) {
      showModal('Por favor, preencha todos os campos')
      return
    }

    if (nameRef.current.length < 10 || nameRef.current.length > 60) {
      showModal('O nome deve ter entre 10 e 60 caracteres')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailRef.current)) {
      showModal('Digite um email válido')
      return
    }

    if (passwordRef.current.length < 6) {
      showModal('A senha deve ter no mínimo 6 caracteres')
      return
    }

    if (passwordRef.current !== confirmPasswordRef.current) {
      showModal('As senhas não coincidem')
      return
    }

    setIsLoading(true)
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    )
    setIsLoading(false)
    console.log('Register res', res)
    if (!res.success) {
      showModal(res.msg)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={'800'}>
            Vamos
          </Typo>
          <Typo size={30} fontWeight={'800'}>
            Começar! 🙂
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Crie uma conta para rastrear todas as suas despesas. 😊
          </Typo>
          <Input
            placeholder={'Digite seu nome'}
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight='fill'
              />
            }
          />
          <Input
            placeholder={'Digite seu email'}
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight='fill'
              />
            }
          />
          <Input
            placeholder={'Digite sua senha'}
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight='fill'
              />
            }
          />

          <Input
            placeholder={'Confirme sua senha'}
            secureTextEntry
            onChangeText={(value) => (confirmPasswordRef.current = value)}
            icon={
              <Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight='fill'
              />
            }
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={'700'} color={colors.black} size={21}>
              Inscrever-se
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Já tem uma conta?</Typo>
          <Pressable onPress={() => router.navigate('/(auth)/login')}>
            <Typo size={15} fontWeight='700' color={colors.primary}>
              Entrar
            </Typo>
          </Pressable>
        </View>
      </View>

      {/* Validation Modal */}
      <Modal
        transparent
        animationType='fade'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.modalCloseIcon}
              onPress={() => setModalVisible(false)}
            >
              <X size={20} color={colors.neutral300} weight='bold' />
            </Pressable>

            <WarningCircle
              size={verticalScale(48)}
              color={colors.primary}
              weight='fill'
            />

            <Typo size={18} fontWeight='700' style={styles.modalTitle}>
              Inscrição
            </Typo>

            <Typo size={15} color={colors.textLighter} style={styles.modalMessage}>
              {modalMessage}
            </Typo>

            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Typo size={15} fontWeight='700' color={colors.black}>
                Entendido
              </Typo>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: colors.text
  },
  form: {
    gap: spacingY._20
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '500',
    color: colors.text
  },
  footer: {
    flowDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  footerText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: verticalScale(15)
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.neutral800,
    borderRadius: 20,
    paddingVertical: spacingY._30,
    paddingHorizontal: spacingX._20,
    alignItems: 'center',
    gap: spacingY._10,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  modalTitle: {
    marginTop: spacingY._10,
  },
  modalMessage: {
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButton: {
    marginTop: spacingY._10,
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(12),
    paddingHorizontal: spacingX._20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
})