package matimatiks.matimatiks;

import android.annotation.TargetApi;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;


public class Splashscreen extends AppCompatActivity {

    private FirebaseAuth firebaseAuth;
    private Intent intent;
    private String name;
    private Animation bounce, slide;
    private ImageView logo;
    private TextView textview;
    private FirebaseDatabase firebaseDatabase;
    public static int VC;
    private boolean out;

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splashscreen);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseDatabase = FirebaseDatabase.getInstance();
        intent = getIntent();


        String j = "MATIMATIKS";

        bounce = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.bounce);
        slide = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.fade_in);

        logo = findViewById(R.id.logo) ;
        textview = findViewById(R.id.company_name) ;
        textview.setText(j);


        out = intent.getBooleanExtra("OUT", false);

        logo.startAnimation(bounce);
        textview.startAnimation(slide);



        Thread thread = new Thread() {

            @Override
            public void run() {

                try {

                    sleep(2000);

                    checkfirstRun();
                    finish();

                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        };
        thread.start();
    }


    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public void checkfirstRun() {

        final String PREFS_NAME = "MyPrefsFile";
        final String PREF_VERSION_CODE_KEY = "version_code";
        final int DOESNT_EXIST = -1;


        // Get current version code
        int currentVersionCode = 0;
        try {
            currentVersionCode = getPackageManager().getPackageInfo(getPackageName(), 0).versionCode;
        } catch (android.content.pm.PackageManager.NameNotFoundException e) {
            // handle exception
            e.printStackTrace();
        }

        // Get saved version code
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        int savedVersionCode = prefs.getInt(PREF_VERSION_CODE_KEY, DOESNT_EXIST);

        // Check for first run or upgrade
        if (currentVersionCode == savedVersionCode) {
            // This is just a normal run
            if (!out && firebaseAuth.getCurrentUser() != null) {
                startActivity(newDocumentIntent());
                return;
            } else {
                Intent i = new Intent(Splashscreen.this, Mainactivity.class);
                startActivity(i);
                return;
            }

        } else if (savedVersionCode == DOESNT_EXIST) {
            // This is a new install (or the user cleared the shared preferences)
            Intent i = new Intent(Splashscreen.this, welcomescreen.class);
            startActivity(i);

        } else if (currentVersionCode > savedVersionCode) {
            // This is an upgrade
            if (!out && firebaseAuth.getCurrentUser() != null) {
                startActivity(newDocumentIntent());
                return;
            } else {
                Intent i = new Intent(Splashscreen.this, Mainactivity.class);
                startActivity(i);
                return;
            }
        }
        // Update the shared preferences with the current version code
        prefs.edit().putInt(PREF_VERSION_CODE_KEY, currentVersionCode).apply();

    }

    /**
     * @return
     */
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private Intent newDocumentIntent() {
        final Intent newDocumentIntent = new Intent(this, Exam_category.class);
        newDocumentIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT |
                android.content.Intent.FLAG_ACTIVITY_RETAIN_IN_RECENTS);
        return newDocumentIntent;
    }



}
