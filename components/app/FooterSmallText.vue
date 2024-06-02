<script setup lang="ts">
import { useDisplay } from "vuetify";
const { smAndUp } = useDisplay();
// @@eos
</script>
<template>
  <Footer class="component--">
    <VSpacer class="mb-48" />
    <VContainer
      fluid
      class="pt-12 !pb-32 bg-stone-400 border-t-lg border-primary border-opacity-100"
    >
      <div class="space-y-5">
        <section>
          <h2>Ko smo mi?</h2>
          <p>
            <small>
              KANTAR.RS je online pijaca za sveže i sušene proizvode koji
              okuplja strastvene proizvođače i zanatlije, naslednike autentičnog
              znanja i potrošače zabrinute za zdraviju, ukusniju i odgovorniju
              hranu.
            </small>
          </p>
        </section>
        <section>
          <h2>Naša misija</h2>
          <h3 style="font-size: 88%">Proizvođači i zanatlije</h3>
          <p>
            <small>
              Pomažemo im da promovišu svoj rad, pomažemo da zablistaju u svom
              regionu, podržavamo ih da razviju svoju direktnu prodaju.
            </small>
          </p>
          <h3 style="font-size: 88%">Kupci</h3>
          <p>
            <small>
              Nudimo ukus i transparentnost, upoznajemo Vas sa malim,
              kvalitetnim proizvođačima kojima je teško pristupiti (koje ne
              morate nužno pronaći u blizini vašeg doma) i moći ćete da direktno
              naručite njihove sveže proizvode u Vaš dom na dan po Vašem izboru.
            </small>
          </p>
        </section>
        <section>
          <h2>Naša vizija: Razmena bez posrednika</h2>
          <p>
            <small>
              Pomažemo im da promovišu svoj rad, pomažemo da zablistaju u svom
              regionu, podržavamo ih da razviju svoju direktnu prodaju.
            </small>
          </p>
          <p>
            <small>
              KANTAR.RS uspostavlja direktnu, autentičnu i trajnu vezu sa našim
              proizvođačima i zanatlijama. Svaki dan, održavamo i razvijamo ovu
              vezu, stavljajući ljude u srce našeg projekta.
            </small>
          </p>
          <p>
            <small>
              Nudimo virtuelnu pijacu za raznovrsnu, zdravu i ukusnu hranu koju
              proizvode lokalni proizvođači poštujući svoju zemlju i životnu
              sredinu.
            </small>
          </p>
          <p>
            <small>
              Smatramo da je od suštinske važnosti da se promoviše regionalni
              zanatlija i da se njegovo proizvod predstavi u što je moguće većem
              broju ljudi. Stoga stavljamo našu digitalnu ekspertizu u službu
              njihovog zanatskog znanja.
            </small>
          </p>
          <p>
            <small>
              U KANTAR.RS posvećeni smo radu sa strastvenim proizvođačima koji
              stavljaju kvalitet i transparentnost u centar svojih briga. Ovo su
              vrednosti koje želimo da prenesemo radeći u duhu otvorenosti,
              razmene i saradnje.
            </small>
          </p>
          <p>
            <small>
              Konačno, sa žarom branimo i promovišemo srpsko kulinarsko nasleđe.
              Zato što se kolektivnim zalaganjem bolje konzumira pojedinačno.
            </small>
          </p>
          <p>
            <small> KANTAR.RS: Delimo ono što je dobro! </small>
          </p>
        </section>
        <section>
          <h2>Naša obaveza: Kvalitet! Kvalitet ! Kvalitet !</h2>
          <p>
            <small>
              Kvalitet porekla: proizvodi na našim tezgama prvenstveno
              ispunjavaju zvanične kriterijume kvaliteta i proizvedeni su
              korišćenjem održivih ili organskih metoda poljoprivrede. Postoji
              potpuna transparentnost o poreklu proizvoda - Mesto proizvodnje,
              uzgoj/klanje i prerada.
            </small>
          </p>
          <p>
            <small>
              Kvalitet transporta: svaka porudžbina se preuzima direktno na
              mestu proizvodnje, i isporučuje kupcima od strane proizvođača. Ako
              se na KANTAR.RS pošalje nekoliko porudžbina, one će automatski
              biti grupisane zajedno za isporuku na željeni dan.
            </small>
          </p>
          <p>
            <small>
              Poštovanje hladnog lanca: Tokom celog putovanja, temperatura se
              prati pomoću RFID čipa i podaci se šalju u namensku ćeliju za
              nadzor.
            </small>
          </p>
        </section>
        <section>
          <h2>Kako funkcioniše direktna isporuka proizvođača?</h2>
          <p>
            <small>
              KANTAR.RS je tržište za lokalne proizvode, kupujete direktno od
              proizvođača i zanatlija koji se onda brinu o isporuci svojih
              proizvoda do vas, pojedinačno. Ali da bi se porudžbine grupisale
              prilikom isporuke, KANTAR.RS je razvio algoritam koji omogućava
              kupcu da odabere dan isporuke na osnovu kriterijuma isporuke
              proizvođača i da grupiše porudžbinu od nekoliko proizvođača tokom
              poslednjeg kilometra.
            </small>
          </p>
        </section>
      </div>
    </VContainer>
    <VRow
      no-gutters
      class="pa-12 bg-stone-500 ma-0 border-t border-primary-darken-1 border-opacity-100 space-y-10"
      style="font-size: 81%"
    >
      <VCol sm="4" class="d-flex flex-col items-center">
        <div class="d-flex flex-col items-center justify-center">
          <NuxtLink to="/">
            <VIcon
              color="primary-darken-1"
              class="scale-[2.55]"
              style="font-size: 5.6rem"
              icon="$iconLogoKantarH"
            />
          </NuxtLink>
          <strong
            style="font-size: 1rem"
            class="d-flex items-center gap-4 px-1 -translate-x-1"
          >
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon size="large" icon="$iconFacebook" />
              </a>
            </NuxtLink>
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon icon="$iconInstagramPourdebon" class="-translate-x-1" />
              </a>
            </NuxtLink>
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon icon="$iconTwitterBird" />
              </a>
            </NuxtLink>
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon icon="$iconPinterest" />
              </a>
            </NuxtLink>
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon icon="$iconLinkedin" />
              </a>
            </NuxtLink>
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon icon="$iconYoutubeText" />
              </a>
            </NuxtLink>
            <NuxtLink to="#" external target="_blank">
              <a class="link--primary-base text-primary-darken-1">
                <VIcon icon="$iconReddit" />
              </a>
            </NuxtLink>
          </strong>
        </div>
      </VCol>
      <VCol
        offset-sm="1"
        sm="2"
        :class="smAndUp ? 'translate-x-3' : 'text-center'"
        class="space-y-1"
      >
        <h5>
          <NuxtLink to="/">
            <a>Česta pitanja</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/tos.html" external target="_blank">
            <a>Uslovi korišćenja</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Svi naši proizvođači i zanatlije</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink :to="{ name: 'o-nama' }">
            <a>O nama</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Uputstvo za poručivanje</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Kontakt za prodavce</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Politika privatnosti</a>
          </NuxtLink>
        </h5>
      </VCol>
      <VCol
        offset-sm="1"
        sm="2"
        :class="smAndUp ? 'translate-x-3' : 'text-center'"
        class="space-y-1"
      >
        <h5>
          <NuxtLink to="/">
            <a>Cenovnik</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Dostava i plaćanje</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Reklamacije i otkaz</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Pravna lica</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Pratite svoju isporuku</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Da li ste ozbiljan kupac?</a>
          </NuxtLink>
        </h5>
        <h5>
          <NuxtLink to="/">
            <a>Zapošljavamo</a>
          </NuxtLink>
        </h5>
      </VCol>
    </VRow>
    <VRow
      style="font-size: 1.22rem"
      class="bg-black/90 ma-0 pa-1 !text-white/20 text-body-2 !font-mono d-flex items-center justify-evenly"
    >
      <small>
        <NuxtLink to="/">
          <a>&copy; 2024. kantar.rs</a>
        </NuxtLink>
      </small>
      <small>
        <NuxtLink to="/">
          <a>uslovi</a>
        </NuxtLink>
      </small>
      <small>
        <NuxtLink to="/">
          <a>prava</a>
        </NuxtLink>
      </small>
      <small>
        <NuxtLink to="/">
          <a>kolačići</a>
        </NuxtLink>
      </small>
      <small>
        <NuxtLink to="/">
          <a>lični podaci</a>
        </NuxtLink>
      </small>
      <small>
        <NuxtLink to="/">
          <a>saglasnost</a>
        </NuxtLink>
      </small>
    </VRow>
  </Footer>
</template>
<style lang="scss" scoped></style>
