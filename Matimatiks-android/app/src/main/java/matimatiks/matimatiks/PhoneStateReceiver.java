package matimatiks.matimatiks;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.TelephonyManager;

/**
 * Created by ridwan on 5/9/2017.
 */

public class PhoneStateReceiver extends BroadcastReceiver {

   private String state;
    @Override
    public void onReceive(Context context, Intent intent) {

state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);

        if(state.equals(TelephonyManager.EXTRA_STATE_RINGING)){

        }

        if(state.equals(TelephonyManager.EXTRA_STATE_OFFHOOK)){

        }

        if(state.equals(TelephonyManager.EXTRA_STATE_IDLE)){

        }

    }
}
